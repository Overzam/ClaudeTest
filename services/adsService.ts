import { Platform } from 'react-native';
import mobileAds, {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { ADMOB_REWARDED_UNIT_ID_ANDROID, ADMOB_REWARDED_UNIT_ID_IOS } from '@/constants/Config';

const REAL_UNIT_ID = Platform.OS === 'ios' ? ADMOB_REWARDED_UNIT_ID_IOS : ADMOB_REWARDED_UNIT_ID_ANDROID;

// Falls back to Google's test ad unit until real IDs are configured,
// so the app never accidentally serves/requests real ads in dev builds.
const REWARDED_UNIT_ID = REAL_UNIT_ID.includes('XXXX') ? TestIds.REWARDED : REAL_UNIT_ID;

let initialized = false;

export async function initAds() {
  if (initialized) return;
  await mobileAds().initialize();
  initialized = true;
}

/**
 * Loads and shows a rewarded ad. Resolves `true` if the user watched it
 * to completion and earned the reward, `false` otherwise (closed early,
 * failed to load, network error, etc).
 */
export function showRewardedAd(): Promise<boolean> {
  return new Promise((resolve) => {
    const ad = RewardedAd.createForAdRequest(REWARDED_UNIT_ID);
    let earned = false;

    const unsubEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      earned = true;
    });
    const unsubLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      ad.show();
    });
    const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      unsubEarned();
      unsubLoaded();
      unsubClosed();
      unsubError();
      resolve(earned);
    });
    const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
      unsubEarned();
      unsubLoaded();
      unsubClosed();
      unsubError();
      resolve(false);
    });

    ad.load();
  });
}
