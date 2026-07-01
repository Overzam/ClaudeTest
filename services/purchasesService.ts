import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, type CustomerInfo, type PurchasesOffering } from 'react-native-purchases';
import {
  REVENUECAT_API_KEY_ANDROID,
  REVENUECAT_API_KEY_IOS,
  REVENUECAT_ENTITLEMENT_PREMIUM,
} from '@/constants/Config';

let configured = false;

export function initPurchases(appUserId?: string) {
  if (configured) return;
  const apiKey = Platform.OS === 'ios' ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;
  if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.configure({ apiKey, appUserID: appUserId });
  configured = true;
}

export function logInPurchases(appUserId: string) {
  if (!configured) return;
  return Purchases.logIn(appUserId);
}

export function logOutPurchases() {
  if (!configured) return;
  return Purchases.logOut();
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  const offerings = await Purchases.getOfferings();
  return offerings.current ?? null;
}

export async function purchasePackage(pkg: Parameters<typeof Purchases.purchasePackage>[0]) {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo> {
  return Purchases.restorePurchases();
}

export async function getCustomerInfo(): Promise<CustomerInfo> {
  return Purchases.getCustomerInfo();
}

export function isEntitlementActive(info: CustomerInfo): boolean {
  return !!info.entitlements.active[REVENUECAT_ENTITLEMENT_PREMIUM];
}

export function entitlementExpiryDate(info: CustomerInfo): string | null {
  return info.entitlements.active[REVENUECAT_ENTITLEMENT_PREMIUM]?.expirationDate ?? null;
}

export function onCustomerInfoUpdate(listener: (info: CustomerInfo) => void): () => void {
  Purchases.addCustomerInfoUpdateListener(listener);
  return () => {
    Purchases.removeCustomerInfoUpdateListener(listener);
  };
}
