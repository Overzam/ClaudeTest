import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Tip {
  id: string;
  category: string;
  emoji: string;
  title: string;
  body: string;
  pro?: string;
}

const TIPS: Tip[] = [
  // Couteaux
  { id: 't1', category: 'Couteaux', emoji: '🔪', title: 'La prise en pince', body: "Tenez votre couteau en pinçant la lame entre le pouce et l'index, pas par le manche. Vous gagnez en précision et en contrôle.", pro: 'Tous les cuisiniers pro utilisent cette prise' },
  { id: 't2', category: 'Couteaux', emoji: '🔪', title: 'La main en griffe', body: 'Recourez les doigts vers l\'intérieur comme une griffe de chat pour protéger vos phalanges. Le dos de la main guide le couteau.', pro: 'Technique enseignée en école de cuisine' },
  { id: 't3', category: 'Couteaux', emoji: '🔪', title: 'Entretien de la lame', body: "Affûtez votre couteau avant chaque utilisation avec un fusil, pas un aiguiseur électrique. Un couteau tranchant est plus sûr qu'un couteau émoussé.", pro: 'Passez 10 secondes à affûter avant chaque session' },

  // Sauces
  { id: 't4', category: 'Sauces', emoji: '🥄', title: 'Monter au beurre', body: "Hors du feu, incorporez des dés de beurre froid en fouettant vivement pour créer une sauce brillante et liée. Si le beurre fond trop vite, il « tranche ».", pro: 'Le secret des sauces beurre blanc en gastronomie' },
  { id: 't5', category: 'Sauces', emoji: '🥄', title: 'Déglacer pour les sucs', body: "Après une viande poêlée, versez du vin, bouillon ou vinaigre dans la poêle chaude et grattez les sucs dorés. C'est là que réside toute la saveur.", pro: 'Base de tous les jus et sauces de rôtisserie' },
  { id: 't6', category: 'Sauces', emoji: '🥄', title: 'Liaison à la fécule', body: "Délayez toujours la fécule dans un liquide froid avant de l'ajouter à chaud, sinon des grumeaux se forment. Ratio : 1c. à café pour 250ml.", pro: 'Préférez la fécule de maïs pour une sauce translucide' },

  // Cuisson
  { id: 't7', category: 'Cuisson', emoji: '🍳', title: 'Saisir = chaleur sèche', body: "Une poêle trop froide fait bouillir les aliments dans leur jus au lieu de les saisir. Chauffez jusqu'à voir une légère fumée avant d'ajouter le gras.", pro: 'La réaction de Maillard se produit à 140°C+' },
  { id: 't8', category: 'Cuisson', emoji: '🍳', title: 'Cuire à basse température', body: "Une viande cuite à 60-65°C pendant 1-2h reste juteuse et tendre partout. La chaleur se diffuse uniformément sans assécher l'extérieur.", pro: 'Le principe du sous-vide, faisable au four ordinaire' },
  { id: 't9', category: 'Cuisson', emoji: '🍳', title: 'Repos après cuisson', body: "Laissez reposer la viande 5-10 min hors du feu sous une feuille d'alu. Les jus se redistribuent — vous perdrez 50% moins de jus à la découpe.", pro: 'Règle d\'or : temps de repos = épaisseur en cm × 2 minutes' },
  { id: 't10', category: 'Cuisson', emoji: '🍳', title: 'L\'eau salée comme la mer', body: "L'eau de cuisson des pâtes doit être très salée (10g/l). Le sel ne sert pas qu'à goûter — il gélatinise l'amidon différemment et rend la pâte plus ferme.", pro: 'Les Italiens disent « sale come il mare »' },

  // Pâtisserie
  { id: 't11', category: 'Pâtisserie', emoji: '🧁', title: 'Ingrédients à température ambiante', body: "Beurre, œufs, lait doivent être à température ambiante pour s'incorporer uniformément. Un beurre trop froid empêche la crème de s'émulsionner.", pro: 'Sortez vos ingrédients 1h avant de pâtisser' },
  { id: 't12', category: 'Pâtisserie', emoji: '🧁', title: 'Peser, pas mesurer', body: "En pâtisserie, pesez toujours au gramme près. Une tasse de farine peut varier de 120g à 180g selon le tassement — une différence catastrophique.", pro: 'La cuisine pardonne, la pâtisserie non' },
  { id: 't13', category: 'Pâtisserie', emoji: '🧁', title: 'Le bain-marie parfait', body: "L'eau du bain-marie ne doit jamais toucher le fond du bol supérieur. Gardez l'eau frémissante, pas bouillante, pour un contrôle délicat de la chaleur.", pro: 'Idéal pour fondre le chocolat et cuire les crèmes' },

  // Aromates
  { id: 't14', category: 'Aromates', emoji: '🌿', title: 'Herbes fraîches vs séchées', body: "Les herbes fraîches s'ajoutent en fin de cuisson (basilic, coriandre). Les herbes séchées se cuisent longtemps pour s'exprimer (thym, romarin, laurier).", pro: 'Ratio : 1c. à soupe fraîches = 1c. à café séchées' },
  { id: 't15', category: 'Aromates', emoji: '🌿', title: 'Infuser à froid', body: "Faites infuser ail, épices et herbes dans une huile froide que vous chauffez doucement. La saveur sera plus complexe et profonde qu'un ajout direct.", pro: 'Technique du confit d\'ail : 1h à 90°C dans l\'huile' },
  { id: 't16', category: 'Aromates', emoji: '🌿', title: 'Bloom des épices', body: "Faites revenir vos épices moulues 30 secondes à sec dans une poêle chaude ou dans le gras chaud. Cela libère les huiles essentielles et double l'intensité.", pro: 'Toujours utilisé en cuisine indienne — le « tadka »' },

  // Pâtes & Riz
  { id: 't17', category: 'Pâtes & Céréales', emoji: '🍝', title: "Al dente, c'est quoi exactement ?", body: "Une pâte al dente a un fin cœur blanc encore cru. Elle finit de cuire dans la sauce. Pour tester : coupez-en une — il doit rester un point blanc.", pro: 'Retirez les pâtes 2 min avant la durée indiquée' },
  { id: 't18', category: 'Pâtes & Céréales', emoji: '🍚', title: 'Rincer le riz... ou pas', body: "Rincez le riz à sushi pour enlever l'excès d'amidon. Ne rincez PAS le risotto — l'amidon est ce qui crée sa texture crémeuse. Chaque riz a sa règle.", pro: 'Riz pilaf : rincé et toasté. Risotto : ni l\'un ni l\'autre' },
  { id: 't19', category: 'Pâtes & Céréales', emoji: '🍝', title: 'Eau de cuisson = or liquide', body: "Réservez toujours une louche d'eau de cuisson avant d'égoutter. Riche en amidon, elle lie la sauce aux pâtes et ajuste la texture.", pro: 'Dans la cacio e pepe, c\'est l\'unique source de liaison' },

  // Umami & Saveur
  { id: 't20', category: 'Saveurs', emoji: '😋', title: 'L\'umami, 5e saveur', body: "L'umami est la saveur de la glutamate — profonde, ronde, qui dure longtemps. Parmesan, anchois, miso, champignons, tomates séchées : tous riches en umami naturel.", pro: 'Découvert par Kikunae Ikeda en 1908 au Japon' },
  { id: 't21', category: 'Saveurs', emoji: '😋', title: 'Équilibrer l\'acidité', body: "Un plat trop gras ? Ajoutez un trait de citron ou de vinaigre. L'acidité coupe la richesse et ravive toutes les autres saveurs. Quelques gouttes suffisent.", pro: 'Finissez toujours vos plats avec une pointe d\'acide' },
  { id: 't22', category: 'Saveurs', emoji: '😋', title: 'Sucre = équilibre, pas douceur', body: "Une pincée de sucre dans une sauce tomate acide ne la rend pas sucrée — elle équilibre l'acidité. Le sucre est un régulateur de saveur, pas juste un édulcorant.", pro: 'Technique italo-napolitaine classique' },

  // Conservation
  { id: 't23', category: 'Conservation', emoji: '🫙', title: 'Congélation des herbes', body: "Mixez vos herbes fraîches avec un peu d'huile d'olive et congelez-les dans un bac à glaçons. Vous aurez des portions prêtes à l'emploi toute l'année.", pro: 'Idéal pour le basilic en saison estivale' },
  { id: 't24', category: 'Conservation', emoji: '🫙', title: 'Lacto-fermentation', body: "Le sel inhibe les mauvaises bactéries et favorise les lactobacilles naturels. À 2% de sel sur le poids des légumes, vous obtenez une fermentation stable et sûre.", pro: 'Aucun équipement spécial — juste sel + légumes + bocal' },

  // Viandes
  { id: 't25', category: 'Viandes', emoji: '🥩', title: 'Tempérer la viande', body: "Sortez la viande du réfrigérateur 30-45 minutes avant la cuisson. Une viande froide au centre cuit de façon inégale — l'extérieur brûle avant que le cœur soit chaud.", pro: 'Surtout crucial pour les grosses pièces (rôtis, côtes de bœuf)' },
  { id: 't26', category: 'Viandes', emoji: '🥩', title: 'Saisir dans la bonne graisse', body: "Utilisez du beurre clarifié (ou ghee) ou de l'huile à haute température pour saisir la viande. Le beurre ordinaire brûle à partir de 130°C — bien trop bas.", pro: 'Ajoutez le beurre non clarifié en fin de cuisson pour le goût' },
  { id: 't27', category: 'Viandes', emoji: '🥩', title: 'Découper dans le sens inverse des fibres', body: "Repérez la direction des fibres musculaires et découpez perpendiculairement à elles. Cela raccourcit les fibres et rend la viande plus tendre à la mastication.", pro: 'Essentiel pour la bavette, le flank steak, le rôti de palette' },
  { id: 't28', category: 'Viandes', emoji: '🐔', title: 'Poulet : sécher la peau', body: "Pour une peau croustillante, séchez le poulet avec du papier absorbant avant cuisson. L'humidité en surface crée de la vapeur qui ramollit la peau au lieu de la griller.", pro: 'Le laisser sécher 1h à l\'air libre au réfrigérateur donne les meilleurs résultats' },

  // Cuisine Japonaise
  { id: 't29', category: 'Japonais', emoji: '🍜', title: 'Le dashi, base de tout', body: "Le dashi (bouillon de kombu et bonite séchée) est à la cuisine japonaise ce que le bouillon est à la française. Il se prépare en 15 minutes mais structure toutes les saveurs.", pro: 'Ne jamais faire bouillir — le kombu libère une amertume à l\'ébullition' },
  { id: 't30', category: 'Japonais', emoji: '🍣', title: 'Riz à sushi : le vinaigre', body: "La vinaigrette du riz à sushi (vinaigre de riz, sel, sucre) ne doit pas être mélangée mais tranchée dans le riz avec une spatule en bois, pour ne pas écraser les grains.", pro: 'Évantez le riz pendant le mélange pour qu\'il refroidisse vite et brille' },
  { id: 't31', category: 'Japonais', emoji: '🍱', title: 'Umami naturel japonais', body: "Les Japonais utilisent le principe de 'umami synergy' : combiner kombu (glutamate) et bonite séchée (inosinate) double la perception de l'umami de façon exponentielle.", pro: '1+1=8 en matière d\'umami selon les recherches de Kikunae Ikeda' },

  // Méditerranée
  { id: 't32', category: 'Méditerranée', emoji: '🫒', title: 'Huile d\'olive : cuire ou finir', body: "L'huile d'olive extra vierge a un point de fumée à 190°C — suffisant pour la plupart des cuissons. Mais son goût s'altère à haute température. Gardez la meilleure pour finir les plats.", pro: 'Pour les friture : huile d\'olive raffinée ou huile de tournesol' },
  { id: 't33', category: 'Méditerranée', emoji: '🧄', title: 'L\'ail : 3 intensités', body: "Ail cru : intense et piquant. Ail émincé revenu : doux et parfumé. Ail confit (1h à 90°C dans l'huile) : caramélisé, sucré, fondant. Choisissez selon l'effet voulu.", pro: 'L\'ail confit en pot se conserve 3 semaines au réfrigérateur' },
  { id: 't34', category: 'Méditerranée', emoji: '🍋', title: 'Citron : zeste d\'abord', body: "Prélevez toujours le zeste avant de presser le citron. Le zeste contient les huiles essentielles les plus aromatiques — jusqu'à 10× plus parfumé que le jus.", pro: 'Congelez les zestes en excès — ils durent 6 mois au congélateur' },

  // Œufs
  { id: 't35', category: 'Œufs', emoji: '🥚', title: 'Tester la fraîcheur', body: "Plongez un œuf dans un verre d'eau : s'il coule à plat, il est frais. S'il se dresse debout, il vieillit. S'il flotte, jetez-le — la chambre d'air s'est trop agrandie.", pro: 'Les œufs frais sont essentiels pour pochés et à la coque' },
  { id: 't36', category: 'Œufs', emoji: '🥚', title: 'Blancs en neige : le secret', body: "Utilisez un bol parfaitement propre et sec — une trace de gras empêche les blancs de monter. Ajoutez une pincée de sel ou quelques gouttes de citron pour stabiliser.", pro: 'Commencez à vitesse lente pour créer de petites bulles stables' },
  { id: 't37', category: 'Œufs', emoji: '🥚', title: 'L\'œuf parfaitement poché', body: "Eau frémissante (pas bouillante) avec un filet de vinaigre. Créez un tourbillon, cassez l'œuf dans une tasse puis glissez-le au centre du tourbillon. 3 minutes pour un jaune coulant.", pro: 'Le tourbillon centre le blanc autour du jaune' },
  { id: 't38', category: 'Œufs', emoji: '🥚', title: 'Brouillés à la française', body: "Les œufs brouillés parfaits se cuisent à feu très doux, sans arrêt de remuer, et se retirent du feu avant d'être totalement cuits — ils finissent à la chaleur résiduelle.", pro: 'Gordon Ramsay : hors du feu dès que ça crème, finir avec une cuillère de crème fraîche' },
  { id: 't39', category: 'Œufs', emoji: '🥚', title: 'Omelette sans coloration', body: "Pour une omelette baveuse à la française, la poêle doit être chaude mais pas brûlante. Remuez en va-et-vient constant et retirez du feu dès que la surface n'est plus liquide.", pro: 'La coloration dorée = omelette trop cuite selon la tradition française' },
  { id: 't40', category: 'Œufs', emoji: '🥚', title: 'Mayonnaise maison stable', body: "Montez la mayo en ajoutant l'huile en filet très fin au début. Si elle tranche, recommencez avec un jaune neuf et incorporez la mayo tranchée comme si c'était l'huile.", pro: 'Tous les ingrédients à la même température évite le tranchage' },

  // Couteaux (suite)
  { id: 't41', category: 'Couteaux', emoji: '🔪', title: 'Quel couteau pour quoi ?', body: "Couteau de chef (20cm) : polyvalent. Couteau d'office (9cm) : fruits, épluchage précis. Couteau à pain : dentelé, jamais affûté. Filet de sole : flexible, pour lever les filets.", pro: 'Un bon couteau de chef suffit pour 90% des tâches en cuisine' },
  { id: 't42', category: 'Couteaux', emoji: '🔪', title: 'Stabiliser la planche', body: "Glissez un torchon humide sous votre planche à découper. Elle ne glissera plus — c'est la première règle de sécurité en cuisine professionnelle.", pro: 'Une planche qui glisse est la cause n°1 de coupures' },
  { id: 't43', category: 'Couteaux', emoji: '🔪', title: 'Ranger sans abîmer', body: "Ne jetez jamais vos couteaux dans un tiroir en vrac. Utilisez un bloc, un rail magnétique ou des protège-lames. Une lame qui racle du métal s'émousse en quelques semaines.", pro: 'Le rail magnétique est la solution des pros : visible, accessible, sans contact métal' },

  // Sauces (suite)
  { id: 't44', category: 'Sauces', emoji: '🥄', title: 'Les 5 sauces mères', body: "Toutes les sauces françaises dérivent de 5 bases : Béchamel (lait), Velouté (fond clair), Espagnole (fond brun), Hollandaise (beurre+jaunes), Tomate. Maîtrisez-les et vous maîtrisez tout.", pro: 'Auguste Escoffier a codifié ce système au XIXe siècle' },
  { id: 't45', category: 'Sauces', emoji: '🥄', title: 'Réduction = concentration', body: "Pour intensifier une sauce, faites-la réduire à feu vif sans couvercle. L'eau s'évapore, les saveurs se concentrent. Réduire de moitié double généralement l'intensité.", pro: 'Ne salez jamais avant réduction — vous risquez une sauce trop salée' },
  { id: 't46', category: 'Sauces', emoji: '🥄', title: 'Émulsion : vinaigrette stable', body: "Pour une vinaigrette qui ne se sépare pas, fouettez d'abord la moutarde avec le vinaigre, puis ajoutez l'huile en filet. La moutarde est l'émulsifiant naturel.", pro: 'Ratio classique : 1 vinaigre pour 3 huile' },

  // Cuisson (suite)
  { id: 't47', category: 'Cuisson', emoji: '🍳', title: 'Four ventilé vs statique', body: "Four ventilé : chaleur tournante, cuisson uniforme, température effective 10-20°C plus chaude. Four statique : croûte plus douce, idéal pour les génoises et soufflés. Adaptez selon la recette.", pro: 'Réduisez toujours de 10°C quand vous passez d\'une recette statique à ventilé' },
  { id: 't48', category: 'Cuisson', emoji: '🍳', title: 'La cuisson à la vapeur', body: "La vapeur cuit sans contact avec l'eau — les vitamines hydrosolubles restent dans l'aliment. L'eau de vapeur doit frémissant, pas bouillonner violemment, pour une cuisson douce.", pro: 'Les légumes vapeur gardent jusqu\'à 50% de vitamines en plus vs eau bouillante' },
  { id: 't49', category: 'Cuisson', emoji: '🍳', title: 'Caramélisation des oignons', body: "Les vrais oignons caramélisés prennent 45 minutes à feu doux, pas 10 minutes. Résistez à l'envie de monter le feu. L'eau s'évapore, les sucres se concentrent et brunissent lentement.", pro: 'Une pincée de bicarbonate accélère (et ramollit) — mais moins de complexité' },
  { id: 't50', category: 'Cuisson', emoji: '🍳', title: 'Test de la goutte d\'eau', body: "Pour savoir si votre poêle est prête : faites tomber une goutte d'eau. Si elle grésille et s'évapore immédiatement → assez chaude. Si elle roule en boule (effet Leidenfrost) → trop chaude.", pro: 'L\'effet Leidenfrost se produit à 193°C+' },

  // Pâtisserie (suite)
  { id: 't51', category: 'Pâtisserie', emoji: '🧁', title: 'La crème pâtissière sans grumeaux', body: "Fouettez les jaunes avec le sucre jusqu'au ruban, ajoutez la fécule, puis versez le lait chaud en filet en fouettant. Remettez sur le feu et fouettez sans arrêt jusqu'à épaississement.", pro: 'Le secret : ne jamais arrêter de fouetter une fois sur le feu' },
  { id: 't52', category: 'Pâtisserie', emoji: '🧁', title: 'Pâte brisée : ne pas chauffer', body: "Travaillez la pâte brisée le moins possible et avec des mains froides. Le gluten ne doit pas se développer. Une pâte trop travaillée rétrécit à la cuisson et devient dure.", pro: 'La technique « sablage » : incorporez le beurre froid du bout des doigts' },
  { id: 't53', category: 'Pâtisserie', emoji: '🧁', title: 'Le chocolat tempéré', body: "Le tempérage du chocolat (fonte à 50°C, refroidissement à 27°C, remontée à 31°C) aligne les cristaux de beurre de cacao. Résultat : chocolat brillant, cassant, qui fond en bouche.", pro: 'Sans tempérage → chocolat terne avec des traces blanches (fat bloom)' },
  { id: 't54', category: 'Pâtisserie', emoji: '🧁', title: 'Génoise : le foisonnement', body: "Pour une génoise aérée, fouettez les œufs entiers avec le sucre au bain-marie jusqu'à 40°C, puis fouettez au batteur jusqu'au complet refroidissement (ruban épais). La farine s'incorpore à la maryse.", pro: 'Le volume triplé au fouet = air incorporé = texture légère garantie' },
  { id: 't55', category: 'Pâtisserie', emoji: '🧁', title: 'Caramel à sec ou à l\'eau', body: "Caramel à sec : sucre seul, résultat plus intense et rapide mais surveiller de près. Caramel à l'eau : plus facile à contrôler, risque de cristallisation si on remue. Les deux donnent la même chose.", pro: 'Ne remuez jamais un caramel humide — inclinez juste la casserole' },

  // Poissons & Fruits de Mer
  { id: 't56', category: 'Poissons', emoji: '🐟', title: 'Reconnaître un poisson frais', body: "Œil brillant et bombé (pas enfoncé), ouïes rouge vif, chair ferme qui reprend sa forme quand on appuie, odeur marine légère (pas ammoniaquée). Un poisson frais ne sent pas « le poisson ».", pro: 'La rigidité cadavérique dure 24-48h — achetez dans ce délai' },
  { id: 't57', category: 'Poissons', emoji: '🐟', title: 'La cuisson côté peau d\'abord', body: "Déposez le filet côté peau dans une poêle chaude avec un peu d'huile. Appuyez légèrement pour éviter que la peau se rétracte. 70% du temps de cuisson côté peau, retournez juste 30 secondes.", pro: 'La chaleur remonte et cuit le dessus sans assécher — peau croustillante garantie' },
  { id: 't58', category: 'Poissons', emoji: '🐟', title: 'Crevettes : ne pas surcuire', body: "Les crevettes sont cuites dès qu'elles forment un « C ». Si elles forment un « O », elles sont trop cuites et deviendront caoutchouteuses. La cuisson prend 1-2 minutes max à feu vif.", pro: 'C = cooked, O = overcooked — la règle des pros' },
  { id: 't59', category: 'Poissons', emoji: '🐠', title: 'Désarêter avec une pince', body: "Passez le doigt à contre-sens sur un filet pour sentir les arêtes. Retirez-les avec une pince à épiler dédiée cuisine en les tirant dans le sens de la fibre (vers la tête).", pro: 'Une pince à épiler propre dédiée cuisine = l\'outil indispensable du poissonnier' },
  { id: 't60', category: 'Poissons', emoji: '🦐', title: 'Marinades pour poissons', body: "Ne marinez jamais un poisson acide (citron, vinaigre) plus de 30 minutes. L'acide « cuit » la chair chimiquement — au-delà, elle devient cotonneuse. C'est le principe du ceviche.", pro: 'Ceviche : poisson « cuit » en 15 min dans le jus de citron vert' },

  // Légumes
  { id: 't61', category: 'Légumes', emoji: '🥦', title: 'Blanchir pour fixer la couleur', body: "Plongez les légumes verts 2-3 min dans l'eau bouillante salée puis immédiatement dans un bol d'eau glacée. La chlorophylle se fixe : les légumes restent vert vif même réchauffés.", pro: 'L\'eau glacée stoppe la cuisson instantanément — cette étape est cruciale' },
  { id: 't62', category: 'Légumes', emoji: '🥕', title: 'Rôtir à haute température', body: "Pour des légumes rôtis savoureux, espacez-les bien sur la plaque (ne superposez pas) et cuisez à 200-220°C. L'espace permet l'évaporation — sinon ils cuisent à la vapeur et restent mous.", pro: 'Trop de légumes sur la plaque = légumes bouillis, pas rôtis' },
  { id: 't63', category: 'Légumes', emoji: '🧅', title: 'Peler les tomates facilement', body: "Incisez en croix le bas des tomates, plongez 30 secondes dans l'eau bouillante, puis eau glacée. La peau se décolle en tiraillant légèrement depuis l'incision.", pro: 'Indispensable pour les coulis et sauces sans peau' },
  { id: 't64', category: 'Légumes', emoji: '🥒', title: 'Dégorger les légumes aqueux', body: "Courgettes, concombres, aubergines : saupoudrez de sel, laissez 30 min, rincez et séchez. L'osmose extrait l'eau — vos légumes sautés seront dorés, pas spongieux.", pro: 'L\'aubergine dégorgée absorbe 40% moins de gras à la friture' },
  { id: 't65', category: 'Légumes', emoji: '🥬', title: 'Revitaliser les légumes fanés', body: "Plongez les légumes fanés dans de l'eau froide avec des glaçons pendant 30 minutes. L'osmose inverse réhydrate les cellules — laitue, radis et persil retrouvent leur croquant.", pro: 'Fonctionne aussi pour les herbes aromatiques qui tombent' },

  // Bouillons & Fonds
  { id: 't66', category: 'Bouillons', emoji: '🍲', title: 'Fond brun vs fond blanc', body: "Fond blanc : carcasses crues flambées à l'eau froide. Fond brun : carcasses rôties au four jusqu'au doré avant de mouiller. Le rôtissage crée la réaction de Maillard = couleur et profondeur.", pro: 'La couleur ambrée d\'un fond brun vient du caramel des sucs, pas du colorant' },
  { id: 't67', category: 'Bouillons', emoji: '🍲', title: 'Démarrer à l\'eau froide', body: "Un bouillon commence TOUJOURS à l'eau froide avec la viande. La montée lente en température coagule les protéines progressivement et les fait remonter en écume qu'on élimine. Eau chaude = bouillon trouble.", pro: 'Écumez minutieusement les 20 premières minutes pour un fond clair' },
  { id: 't68', category: 'Bouillons', emoji: '🍲', title: 'La garniture aromatique', body: "Tout fond classique contient une garniture : oignon (piqué de clous de girofle), carotte, céleri branche (le trio mirepoix) + bouquet garni (thym, laurier, persil). C'est le socle de la cuisine française.", pro: 'Ratio mirepoix : 2 oignons, 1 carotte, 1 branche de céleri' },
  { id: 't69', category: 'Bouillons', emoji: '🍲', title: 'Conserver et réduire', body: "Congelez votre fond en cubes dans un bac à glaçons puis transférez en sac. Ou faites-le réduire jusqu'à consistance sirupeuse (glace de viande) : 10x moins de volume, goût 10x plus intense.", pro: 'La glace de viande se conserve 3 mois au congélateur, quelques jours au frigo' },

  // Friture
  { id: 't70', category: 'Friture', emoji: '🍟', title: 'La température de l\'huile', body: "Pour la friture, maintenez 170-180°C. En dessous : les aliments absorbent l'huile et sont gras. Au-dessus : brûlés à l'extérieur, crus dedans. Un thermomètre est indispensable.", pro: 'Test sans thermomètre : une boulette de pain doit dorer en 30 secondes à 175°C' },
  { id: 't71', category: 'Friture', emoji: '🍟', title: 'Frire en petites quantités', body: "Ne surchargez jamais l'huile de friture. Chaque ajout refroidit l'huile. En petites quantités, la température remonte vite — en grandes quantités, les aliments bouillent dans l'huile au lieu de frire.", pro: 'Idéalement : pas plus de 30% du volume d\'huile en aliments' },
  { id: 't72', category: 'Friture', emoji: '🍟', title: 'Double friture des frites', body: "Les meilleures frites se cuisent deux fois : d'abord à 150°C pour cuire l'intérieur (10 min), repos, puis à 180°C pour dorer la croûte (3 min). Cette méthode crée une croûte craquante et un intérieur moelleux.", pro: 'La méthode belge — inventeurs officiels des frites, qu\'ils soient remerciés' },
  { id: 't73', category: 'Friture', emoji: '🍟', title: 'Égoutter correctement', body: "Égouttez les fritures sur du papier absorbant, mais posez-les debout ou sur une grille — pas à plat. L'air doit circuler sous l'aliment sinon il ramollit dans sa propre vapeur.", pro: 'Une grille posée sur un plat = résultat croustillant garanti' },

  // Marinades
  { id: 't74', category: 'Marinades', emoji: '🫙', title: 'Les 3 éléments d\'une marinade', body: "Toute marinade réussie contient : un acide (citron, vin, vinaigre) qui attendrit, un gras (huile) qui transporte les arômes et protège, et des arômes (herbes, épices, ail). Les trois sont nécessaires.", pro: 'L\'acide attendrit en surface uniquement — une marinade ne pénètre pas en profondeur' },
  { id: 't75', category: 'Marinades', emoji: '🫙', title: 'Temps de marinade optimal', body: "Poisson : 30 minutes max (l'acide le « cuit »). Volaille : 2-12h. Bœuf : 4-24h. Agneau : 4-12h. Au-delà, la texture peut devenir molle et pâteuse — plus longtemps n'est pas forcément mieux.", pro: 'Mariner au réfrigérateur, pas à température ambiante — risque bactérien' },
  { id: 't76', category: 'Marinades', emoji: '🫙', title: 'Sécher avant de cuire', body: "Après avoir mariné, séchez toujours la pièce avec du papier absorbant avant de la cuire. L'humidité en surface empêche la réaction de Maillard — vous obtenez un aliment vapeur, pas doré.", pro: 'Surtout crucial pour les marinades sucrées qui brûlent à l\'excès d\'humidité' },

  // Chocolat
  { id: 't77', category: 'Chocolat', emoji: '🍫', title: 'Pourcentage de cacao', body: "Plus le pourcentage est élevé, moins il y a de sucre. Chocolat noir >70% : amer et complexe. 55-70% : équilibré pour la pâtisserie. Lait ~35% : sucré, bon pour ganaches douces. Blanc : sans cacao, juste beurre.", pro: 'Pour la pâtisserie professionnelle : minimum 64% pour le chocolat noir' },
  { id: 't78', category: 'Chocolat', emoji: '🍫', title: 'Fondre sans brûler', body: "Le chocolat brûle à 55°C. Au micro-ondes : par tranches de 20 secondes, puissance 50%, en remuant entre chaque. Au bain-marie : eau frémissante, bol sec, ne jamais laisser l'eau toucher le chocolat.", pro: 'Une seule goutte d\'eau dans du chocolat fondu = il masse et ne remonte pas' },
  { id: 't79', category: 'Chocolat', emoji: '🍫', title: 'Ganache : ratio lait vs noir', body: "Ganache noire : 1 pour 1 (1 crème pour 1 chocolat). Ganache lait : 1 pour 2 (1 crème pour 2 chocolat lait). Ganache blanche : 1 pour 3. Le chocolat lait et blanc contiennent plus de beurre de cacao.", pro: 'Une ganache trop liquide ? Ajoutez du chocolat. Trop dure ? Ajoutez de la crème chaude.' },
  { id: 't80', category: 'Chocolat', emoji: '🍫', title: 'Mousse au chocolat aérée', body: "Incorporez les blancs en neige en trois fois : d'abord 1/3 pour détendre le chocolat, puis les 2/3 restants à la maryse avec un geste ample et enveloppant. Ne jamais fouetter.", pro: 'Geste « couper-soulever » : la maryse coupe au centre et soulève sur les bords' },

  // Pain & Levures
  { id: 't81', category: 'Pain & Levure', emoji: '🍞', title: 'La levure vivante ou sèche', body: "Levure fraîche : active immédiatement, se conserve 2 semaines au frigo. Levure sèche active : réhydrater dans eau tiède 10 min avant. Levure instantanée : directement dans la farine. Même résultat, dosages différents.", pro: 'Ratio : 7g levure sèche = 25g levure fraîche = une sachet instantanée' },
  { id: 't82', category: 'Pain & Levure', emoji: '🍞', title: 'Le gluten : développer ou non', body: "Pour le pain : pétrissez longuement pour développer le gluten (réseau élastique). Pour les crêpes, muffins, gâteaux : mélangez juste assez — trop de gluten = texture caoutchouteuse et compacte.", pro: 'Test fenêtre : une pâte bien pétrie s\'étire en membrane fine sans se déchirer' },
  { id: 't83', category: 'Pain & Levure', emoji: '🍞', title: 'La pousse lente au frigo', body: "Une pâte à pain levée au réfrigérateur toute une nuit développe 10x plus de saveur qu'une pousse rapide à température ambiante. La fermentation lente crée des acides organiques complexes.", pro: 'La plupart des boulangeries artisanales utilisent des pousses de 12-24h à 4°C' },
  { id: 't84', category: 'Pain & Levure', emoji: '🍞', title: 'Le coup de buée au four', body: "Au début de la cuisson du pain, créez de la vapeur dans le four (vaporisateur ou récipient d'eau bouillante). La vapeur retarde la formation de croûte et permet au pain de gonfler librement.", pro: 'Les fours de boulangerie professionnels ont un système d\'injection de vapeur intégré' },

  // Cuisine Indienne
  { id: 't85', category: 'Indien', emoji: '🍛', title: 'Le curry : une méthode, pas une poudre', body: "En cuisine indienne, « curry » désigne une méthode de cuisson, pas un mélange d'épices unique. Chaque région, chaque recette a ses propres épices. Le « curry en poudre » est une simplification britannique.", pro: 'Le garam masala s\'ajoute EN FIN de cuisson — c\'est un arôme, pas un fond de sauce' },
  { id: 't86', category: 'Indien', emoji: '🍛', title: 'Cuisson du masala de base', body: "La base d'un curry indien : oignon longuement revenu jusqu'au brun profond (20 min), puis ail-gingembre, puis tomates. Cette base « masala » bien cuite est le secret de la profondeur des sauces indiennes.", pro: 'Des oignons insuffisamment cuits = curry qui sent le cru et l\'acide' },
  { id: 't87', category: 'Indien', emoji: '🍛', title: 'Le lassi salé pour équilibrer', body: "Quand un plat est trop épicé, le yaourt ou le lassi salé calme la brûlure mieux que l'eau (la capsaïcine est liposoluble, pas hydrosoluble). Le riz, le pain et les laitages neutralisent le feu.", pro: 'L\'eau amplifie la sensation de brûlure en dispersant la capsaïcine — contre-intuitif' },

  // Cuisine Marocaine
  { id: 't88', category: 'Marocain', emoji: '🫕', title: 'Le ras el hanout', body: "Le ras el hanout (« tête de boutique ») est un mélange de 12 à 30 épices selon le marchand. Il n'y a pas de recette fixe — c'est le mélange secret de chaque épicier, transmis de génération en génération.", pro: 'Pour l\'acheter : préférez un épicier oriental plutôt que la grande surface' },
  { id: 't89', category: 'Marocain', emoji: '🫕', title: 'Le tajine : cuisson à l\'étouffée', body: "Le tajine est un plat conique qui recycle la vapeur : la condensation redescend sur les aliments, les arrosant en continu. Cuisez à feu très doux, longtemps. Le liquide doit juste frémir, jamais bouillir.", pro: 'La pointe du couvercle refroidissant = vapeur qui se condense et retombe = autocirrosage' },
  { id: 't90', category: 'Marocain', emoji: '🫕', title: 'La chermoula', body: "La chermoula (marinade marocaine : coriandre, persil, ail, cumin, paprika, citron confit, huile d'olive) est utilisée aussi bien en marinade pour le poisson que comme sauce d'accompagnement.", pro: 'Préparez-en une grande quantité et conservez 1 semaine au frigo sous film' },

  // Cuisine Mexicaine
  { id: 't91', category: 'Mexicain', emoji: '🌮', title: 'Le piment : variétés et intensités', body: "Jalapeño : 2500-8000 Scoville, fruité. Serrano : 3x plus fort, herbacé. Chipotle : jalapeño fumé, doux et profond. Ancho : poblano séché, sucré et doux. Habanero : 100000+, tropical et brûlant.", pro: 'Retirez les graines et les côtes blanches pour diviser l\'intensité par 3' },
  { id: 't92', category: 'Mexicain', emoji: '🌮', title: 'Guacamole : l\'avocat parfait', body: "Un avocat mûr est légèrement mou au toucher près du pédoncule (pas partout). La chair doit être verte, pas noire. Pour garder le guacamole vert, pressez un film alimentaire directement sur la surface.", pro: 'Le noyau dans le guac ne prévient pas l\'oxydation — c\'est un mythe' },
  { id: 't93', category: 'Mexicain', emoji: '🌮', title: 'Tortillas : fraîches ou réchauffées', body: "Réchauffez toujours les tortillas avant de les garnir. Directement sur une flamme vive 30 secondes par côté, ou 10 secondes au micro-ondes sous un torchon humide. Une tortilla froide craque et ne plie pas.", pro: 'Empilez-les enveloppées dans un torchon pour les garder chaudes pendant le repas' },

  // Cuisine Chinoise
  { id: 't94', category: 'Chinois', emoji: '🥢', title: 'Le wok : chaleur infernale', body: "La cuisine au wok exige une chaleur que les feux domestiques peinent à atteindre. Pour compenser : préchauffez le wok à blanc 2-3 minutes, cuisez en très petites quantités, et ne remuez pas trop vite.", pro: 'Le « wok hei » (souffle du wok) vient de la flamme qui lèche les parois — difficile à reproduire chez soi' },
  { id: 't95', category: 'Chinois', emoji: '🥢', title: 'La sauce soja : claire ou foncée', body: "Soja claire (light) : salée, pour assaisonner en cours de cuisson. Soja foncée (dark) : moins salée, plus sucrée et épaisse, pour la couleur et la brillance. Les deux ont des rôles différents dans la même recette.", pro: 'Ne substituez jamais l\'une à l\'autre — la texture et l\'intensité sont trop différentes' },
  { id: 't96', category: 'Chinois', emoji: '🥢', title: 'La fécule dans les sauces chinoises', body: "La fécule de maïs (ou pomme de terre) délayée dans l'eau froide s'ajoute en fin de cuisson pour lier les sauces chinoises. Elle donne un aspect brillant et gélatineux caractéristique.", pro: 'Toujours délayer à froid : fécule + eau froide avant d\'ajouter au liquide chaud' },

  // Conservation (suite)
  { id: 't97', category: 'Conservation', emoji: '🫙', title: 'La mise sous vide maison', body: "Sans machine sous vide : remplissez un sac congélation, plongez-le dans l'eau froide jusqu'à la fermeture — la pression expulse l'air. Fermez sous la surface. Résultat proche du sous-vide professionnel.", pro: 'Méthode « water displacement » utilisée par les chefs à domicile' },
  { id: 't98', category: 'Conservation', emoji: '🫙', title: 'Conserver les fromages', body: "Jamais de film plastique direct sur le fromage — il étouffe. Utilisez du papier ciré ou du papier sulfurisé. Gardez-les dans le bac à légumes du frigo (le moins froid). Sortez-les 30 min avant dégustation.", pro: 'Un fromage trop froid n\'a aucun arôme — la dégustation optimale est à 16-18°C' },
  { id: 't99', category: 'Conservation', emoji: '🫙', title: 'Huiles infusées maison', body: "Faites infuser herbes, piments ou ail dans une huile à froid. Conservez au réfrigérateur maximum 1 semaine pour l'ail et herbes fraîches (risque botulisme). Les herbes séchées : jusqu'à 1 mois.", pro: 'IMPORTANT : les huiles ail/herbes fraîches à température ambiante sont dangereuses' },

  // Saveurs (suite)
  { id: 't100', category: 'Saveurs', emoji: '😋', title: 'Le sel : quand et lequel', body: "Fleur de sel et sel de Maldon : en finition, pour le croquant et l'intensité. Gros sel : cuisson de l'eau. Sel fin : assaisonnement en cours de cuisson. Sel rose de l'Himalaya : aucun avantage scientifique prouvé.", pro: 'Salez toujours en fin de cuisson les légumes verts — le sel les ramollit' },
  { id: 't101', category: 'Saveurs', emoji: '😋', title: 'La graisse = vecteur d\'arôme', body: "Les molécules aromatiques sont liposolubles — elles se dissolvent dans le gras, pas dans l'eau. C'est pour ça qu'une sauce au beurre est plus parfumée qu'un bouillon : la graisse amplifie et transporte les arômes.", pro: 'La crème dans les sauces n\'est pas là pour l\'onctuosité mais pour amplifier les saveurs' },
  { id: 't102', category: 'Saveurs', emoji: '😋', title: 'Assaisonner par couches', body: "Les chefs assaisonnent à chaque étape : la viande avant cuisson, les légumes en sautant, la sauce en réduisant, le plat final. Chaque couche développe des saveurs différentes selon le moment d'ajout.", pro: 'Le sel en début de cuisson pénètre. En fin, il reste en surface pour l\'impact immédiat.' },
];

const CATEGORIES = ['Tous', ...Array.from(new Set(TIPS.map((t) => t.category)))];

export default function TipsScreen() {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = TIPS.filter((t) => {
    const matchCat = activeCategory === 'Tous' || t.category === activeCategory;
    const q = query.toLowerCase();
    const matchQuery = !q || t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={c.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Astuces & Techniques</Text>
        <TouchableOpacity onPress={() => router.push('/glossary' as any)} hitSlop={8} style={{ marginLeft: 'auto' }}>
          <Text style={[styles.glossaryLink, { color: c.primary }]}>Glossaire</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
        <Ionicons name="search" size={16} color={c.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: c.text }]}
          placeholder="Rechercher une technique…"
          placeholderTextColor={c.textMuted}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={c.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              { backgroundColor: item === activeCategory ? c.primary : c.surfaceElevated, borderColor: item === activeCategory ? c.primary : c.border },
            ]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={[styles.chipText, { color: item === activeCategory ? '#fff' : c.text }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tips list */}
      <FlatList
        data={filtered}
        keyExtractor={(t) => t.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: Layout.spacing.sm }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={40} color={c.textMuted} />
            <Text style={[styles.emptyText, { color: c.textMuted }]}>Aucune astuce trouvée</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isOpen = expanded === item.id;
          return (
            <TouchableOpacity
              style={[styles.tipCard, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}
              onPress={() => setExpanded(isOpen ? null : item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.tipHeader}>
                <Text style={styles.tipEmoji}>{item.emoji}</Text>
                <View style={styles.tipHeaderText}>
                  <View style={[styles.catBadge, { backgroundColor: c.primary + '15' }]}>
                    <Text style={[styles.catBadgeText, { color: c.primary }]}>{item.category}</Text>
                  </View>
                  <Text style={[styles.tipTitle, { color: c.text }]}>{item.title}</Text>
                </View>
                <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color={c.textMuted} />
              </View>
              {isOpen && (
                <View style={styles.tipBody}>
                  <Text style={[styles.tipBodyText, { color: c.text }]}>{item.body}</Text>
                  {item.pro && (
                    <View style={[styles.proBox, { backgroundColor: c.xpBlue + '15', borderColor: c.xpBlue + '30' }]}>
                      <Ionicons name="bulb-outline" size={14} color={c.xpBlue} style={{ marginBottom: 2 }} />
                      <Text style={[styles.proLabel, { color: c.xpBlue }]}>Le saviez-vous ?</Text>
                      <Text style={[styles.proText, { color: c.textSecondary }]}>{item.pro}</Text>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  glossaryLink: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900', flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 10,
    gap: Layout.spacing.sm,
  },
  searchIcon: {},
  searchInput: { flex: 1, fontSize: Layout.fontSize.md },
  clearBtn: {},
  chips: { paddingHorizontal: Layout.spacing.lg, paddingVertical: Layout.spacing.md, gap: Layout.spacing.sm },
  chip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 6,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  chipText: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  list: { paddingHorizontal: Layout.spacing.lg, paddingBottom: 40 },
  empty: { alignItems: 'center', paddingTop: 60, gap: Layout.spacing.md },
  emptyEmoji: { fontSize: 40 },
  emptyText: { fontSize: Layout.fontSize.md },
  tipCard: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    borderWidth: 1,
    gap: Layout.spacing.sm,
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  tipEmoji: { fontSize: 28 },
  tipHeaderText: { flex: 1, gap: 4 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  catBadgeText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  tipTitle: { fontSize: Layout.fontSize.md, fontWeight: '700' },
  chevron: { fontSize: 12 },
  tipBody: { gap: Layout.spacing.sm, paddingTop: 4 },
  tipBodyText: { fontSize: Layout.fontSize.sm, lineHeight: 22 },
  proBox: {
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.sm,
    gap: 2,
    borderWidth: 1,
  },
  proLabel: { fontSize: Layout.fontSize.xs, fontWeight: '800' },
  proText: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
});
