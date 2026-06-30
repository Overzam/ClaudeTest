import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';

interface Term {
  word: string;
  category: string;
  definition: string;
  example?: string;
  origin?: string;
}

const CULINARY_TERMS: Term[] = [
  { word: 'Brunoise', category: 'Couteau', definition: 'Découpe en très petits dés réguliers de 1-2mm de côté.', example: 'Brunoise de carottes pour une garniture.', origin: 'Français' },
  { word: 'Julienne', category: 'Couteau', definition: 'Découpe en fins bâtonnets de 3-4cm de long et 1-2mm d\'épaisseur.', example: 'Julienne de poireaux pour une soupe.', origin: 'Français' },
  { word: 'Mirepoix', category: 'Couteau', definition: 'Mélange de légumes (carotte, oignon, céleri) coupés en dés grossiers pour parfumer.', origin: 'Du duc de Lévis-Mirepoix, XVIIIe s.' },
  { word: 'Chiffonnade', category: 'Couteau', definition: 'Herbes ou feuilles roulées en cigare et coupées en très fines lanières.', example: 'Chiffonnade de basilic sur une pizza.' },
  { word: 'Suer', category: 'Cuisson', definition: 'Cuire des légumes à feu doux avec matière grasse pour les attendrir sans coloration.', example: 'Faites suer les oignons 5 minutes.' },
  { word: 'Sauter', category: 'Cuisson', definition: 'Cuire rapidement à feu vif dans peu de matière grasse en remuant.', example: 'Sautez les champignons à feu vif.' },
  { word: 'Braiser', category: 'Cuisson', definition: 'Cuire lentement dans un liquide aromatique à couvert, en mijotant.', example: 'Braiser un jarret de veau 3h.' },
  { word: 'Blanchir', category: 'Cuisson', definition: 'Plonger brièvement dans l\'eau bouillante salée puis refroidir dans de l\'eau glacée.', example: 'Blanchir les haricots verts 3 minutes.' },
  { word: 'Déglacer', category: 'Cuisson', definition: 'Verser un liquide (vin, bouillon) dans une poêle chaude pour dissoudre les sucs caramélisés.', example: 'Déglacer au vin blanc après saisie du poulet.' },
  { word: 'Monter au beurre', category: 'Sauce', definition: 'Incorporer du beurre froid en petits morceaux hors du feu pour lier et enrichir une sauce.', example: 'Montez la sauce au beurre hors du feu.' },
  { word: 'Réduire', category: 'Sauce', definition: 'Faire évaporer un liquide par ébullition pour concentrer ses saveurs et l\'épaissir.', example: 'Réduisez le fond de veau de moitié.' },
  { word: 'Liaison', category: 'Sauce', definition: 'Technique pour épaissir une sauce : roux, amidon, œuf, crème, beurre manié.', example: 'Faites une liaison au beurre manié.' },
  { word: 'Roux', category: 'Sauce', definition: 'Mélange de farine et beurre cuits ensemble, base des sauces béchamel, velouté.', example: 'Préparez un roux blond pour la béchamel.' },
  { word: 'Émulsifier', category: 'Technique', definition: 'Mélanger deux liquides non miscibles (huile + eau) pour obtenir une texture homogène.', example: 'Émulsifier la vinaigrette en fouettant énergiquement.' },
  { word: 'Tempérer', category: 'Technique', definition: 'Amener un aliment (chocolat, viande) à température ambiante progressivement.', example: 'Tempérez le chocolat à 31°C pour une brillance parfaite.' },
  { word: 'Chemiser', category: 'Pâtisserie', definition: 'Tapisser l\'intérieur d\'un moule avec une matière (beurre+farine, papier cuisson, biscuit).', example: 'Chemisez le cercle de biscuit cuillère.' },
  { word: 'Foncer', category: 'Pâtisserie', definition: 'Garnir le fond et les parois d\'un moule avec de la pâte.', example: 'Foncez le moule à tarte.' },
  { word: 'Fraiser', category: 'Pâtisserie', definition: 'Écraser la pâte avec la paume pour homogénéiser sans la travailler.', example: 'Fraisez la pâte brisée 2-3 fois.' },
  { word: 'Macaronner', category: 'Pâtisserie', definition: 'Travailler la pâte à macarons pour chasser l\'air et obtenir la texture ruban.', example: 'Macaronnez jusqu\'à ce que la pâte forme un ruban.' },
  { word: 'Bloomer', category: 'Épices', definition: 'Faire griller des épices entières à sec ou dans la matière grasse pour libérer leurs arômes.', example: 'Bloomer les graines de cumin 30s avant d\'ajouter les oignons.', origin: 'De l\'anglais "to bloom"' },
  { word: 'Umami', category: 'Saveurs', definition: 'La 5ème saveur (après sucré, salé, acide, amer) — saveur profonde, longue en bouche.', example: 'Le parmesan, la sauce soja et le miso sont riches en umami.', origin: 'Japonais : 旨味 (délicieusement savoureux)' },
  { word: 'Mise en place', category: 'Organisation', definition: 'Préparation et organisation de tous les ingrédients avant de commencer la cuisson.', origin: 'Français (dans le monde entier)' },
  { word: 'Nappe', category: 'Sauce', definition: 'Consistance d\'une sauce qui enrobe une cuillère sans couler immédiatement.', example: 'La crème anglaise nappe quand elle est prête.' },
  { word: 'Al dente', category: 'Cuisson', definition: 'Pâtes ou légumes cuits mais encore légèrement fermes sous la dent.', origin: 'Italien : "à la dent"' },
  { word: 'Confire', category: 'Cuisson', definition: 'Cuire très lentement dans la graisse (pour la viande) ou dans le sucre (pour les fruits).', example: 'Confir des cuisses de canard dans la graisse à 80°C.' },
  { word: 'Infuser', category: 'Technique', definition: 'Laisser reposer un aromate dans un liquide chaud pour en extraire les saveurs.', example: 'Infusez le safran dans l\'eau chaude 15 minutes.' },
  { word: 'Dégorger', category: 'Technique', definition: 'Saupoudrer un légume de sel pour en extraire l\'eau de végétation.', example: 'Dégorgez les concombres 30 minutes au sel.' },
  { word: 'Lier', category: 'Sauce', definition: 'Épaissir une préparation liquide par addition d\'un liant (amidon, œuf, crème).', example: 'Liez la sauce avec de la maïzena.' },
  { word: 'Dashi', category: 'Bouillon', definition: 'Bouillon japonais de base préparé à partir de kombu et de bonite séchée.', origin: 'Japonais : 出汁' },
  { word: 'Fond', category: 'Bouillon', definition: 'Bouillon concentré de viande ou légumes, base des sauces et braisages.', example: 'Fond de veau brun pour les sauces.' },
  { word: 'Ras el hanout', category: 'Épices', definition: 'Mélange marocain de 20 à 50 épices dont chaque marchand garde la recette secrète.', origin: 'Arabe : "tête du magasin"' },
  { word: 'Gremolata', category: 'Garniture', definition: 'Condiment italien de zeste de citron, ail et persil haché — servi avec l\'osso buco.', origin: 'Italien, Milan' },
  { word: 'Mantecatura', category: 'Technique', definition: 'Incorporation finale de beurre froid et parmesan hors du feu pour lier le risotto.', origin: 'Italien' },
  { word: 'Wok hei', category: 'Technique', definition: 'Saveur fumée et caramélisée caractéristique de la cuisson au wok à très haute température.', origin: 'Cantonais : 鑊氣 (souffle du wok)' },

  // === COUTEAU ===
  { word: 'Paysanne', category: 'Couteau', definition: 'Découpe en fines tranches ou rectangles irréguliers de 2-3mm, plus grossière que la julienne.', example: 'Paysanne de poireaux pour un pot-au-feu.' },
  { word: 'Jardinière', category: 'Couteau', definition: 'Bâtonnets réguliers de 4×4mm et 3-4cm de long, entre la julienne et la macédoine.', example: 'Garniture jardinière de carottes et haricots.' },
  { word: 'Macédoine', category: 'Couteau', definition: 'Petits dés de 5-6mm de côté — plus grands que la brunoise, pour salades et garnitures.', example: 'Macédoine de légumes printaniers.' },
  { word: 'Ciseler', category: 'Couteau', definition: 'Émincer très finement herbes ou oignons en tenant la lame et levant le manche.', example: 'Ciseler la ciboulette juste avant de servir.' },
  { word: 'Tourner', category: 'Couteau', definition: 'Donner à un légume une forme ovale régulière à 7 pans pour une cuisson homogène et une présentation soignée.', example: 'Pommes de terre tournées pour un rôti.' },
  { word: 'Escaloper', category: 'Couteau', definition: 'Couper en tranches fines en biais pour augmenter la surface de contact.', example: 'Escaloper un magret de canard froid.' },
  { word: 'Émincer', category: 'Couteau', definition: 'Couper en tranches fines et régulières dans le sens de la longueur ou de la largeur.', example: 'Émincer des oignons pour les faire suer.' },
  { word: 'Canneler', category: 'Couteau', definition: 'Creuser des sillons réguliers dans la peau d\'un agrume ou légume avec un couteau canneleur.', example: 'Canneler un citron pour la décoration de l\'assiette.' },

  // === CUISSON ===
  { word: 'Pocher', category: 'Cuisson', definition: 'Cuire dans un liquide frémissant (80-90°C), jamais bouillant, pour préserver la texture.', example: 'Pocher des œufs ou des quenelles.' },
  { word: 'Rôtir', category: 'Cuisson', definition: 'Cuire au four à chaleur sèche sur un corps gras, à haute température, sans liquide.', example: 'Rôtir un gigot d\'agneau à 200°C pendant 1h.' },
  { word: 'Frire', category: 'Cuisson', definition: 'Cuire en immersion complète dans une huile chaude (160-180°C) pour obtenir une croûte dorée.', example: 'Frire des beignets ou des frites à 170°C.' },
  { word: 'Griller', category: 'Cuisson', definition: 'Cuire directement sur un gril, une plancha ou une grille à haute température.', example: 'Griller un poisson entier sur un lit de fenouil.' },
  { word: 'Gratiner', category: 'Cuisson', definition: 'Faire dorer la surface d\'un plat sous le gril, au four chaud ou à la salamandre.', example: 'Gratiner un gratin dauphinois 10 min sous le gril.' },
  { word: 'Mariner', category: 'Cuisson', definition: 'Immerger un aliment dans un mélange aromatique (liquide, épices, acide) avant cuisson.', example: 'Mariner le poulet au yaourt et épices 12h.' },
  { word: 'Caraméliser', category: 'Cuisson', definition: 'Cuire les sucres naturels ou ajoutés jusqu\'à obtenir une coloration ambrée et une saveur complexe.', example: 'Caraméliser des oignons à feu doux 30 minutes.' },
  { word: 'Flamber', category: 'Cuisson', definition: 'Arroser d\'une eau-de-vie chaude et enflammer pour brûler l\'alcool en parfumant.', example: 'Flamber les crêpes Suzette au Grand Marnier.' },
  { word: 'Snacker', category: 'Cuisson', definition: 'Saisir très rapidement à feu vif pour colorer la surface en gardant l\'intérieur cru.', example: 'Snacker un carré de thon 30 secondes par face.' },
  { word: 'Mijoter', category: 'Cuisson', definition: 'Cuire longuement à tout petit frémissement (80-90°C) pour attendrir et concentrer les saveurs.', example: 'Mijoter un bœuf bourguignon 3h à feu doux.' },

  // === SAUCE ===
  { word: 'Beurre clarifié', category: 'Sauce', definition: 'Beurre fondu dont on a éliminé l\'eau et les protéines du lait — seul le gras pur reste.', example: 'Cuire du poisson meunière dans le beurre clarifié.' },
  { word: 'Beurre noisette', category: 'Sauce', definition: 'Beurre cuit jusqu\'à coloration blonde-brune et odeur de noisette — les protéines se caramélisent.', example: 'Napper des ravioles de beurre noisette.' },
  { word: 'Gastrique', category: 'Sauce', definition: 'Réduction de sucre caramélisé et de vinaigre, base des sauces aigres-douces.', example: 'Gastrique pour la sauce du canard à l\'orange.' },
  { word: 'Fumet', category: 'Bouillon', definition: 'Bouillon court et concentré de parures de poissons ou de crustacés pour les sauces de la mer.', example: 'Fumet de poisson pour une sauce au vin blanc.' },
  { word: 'Hollandaise', category: 'Sauce', definition: 'Sauce émulsionnée chaude de jaunes d\'œufs montée au bain-marie avec du beurre clarifié.', example: 'Sauce hollandaise sur des œufs Bénédicte.' },
  { word: 'Béarnaise', category: 'Sauce', definition: 'Dérivée de la hollandaise avec une réduction de vinaigre et d\'estragon — servie avec le steak.', example: 'Côte de bœuf à la sauce béarnaise.' },
  { word: 'Court-bouillon', category: 'Bouillon', definition: 'Bouillon de légumes, aromates et vinaigre utilisé pour pocher poissons et crustacés.', example: 'Cuire un bar en court-bouillon parfumé.' },
  { word: 'Beurre manié', category: 'Sauce', definition: 'Mélange à parts égales de beurre mou et de farine crue, ajouté froid pour lier une sauce.', example: 'Ajouter du beurre manié pour épaissir la blanquette.' },

  // === TECHNIQUE ===
  { word: 'Clarifier', category: 'Technique', definition: 'Rendre un bouillon limpide en y cuisant des blancs d\'œufs qui absorbent les impuretés.', example: 'Clarifier un consommé double.' },
  { word: 'Monter', category: 'Technique', definition: 'Incorporer de l\'air dans une préparation par fouettage pour obtenir volume et légèreté.', example: 'Monter une crème en chantilly ferme.' },
  { word: 'Singer', category: 'Technique', definition: 'Saupoudrer de farine une viande ou garniture rissolée pour lier la sauce d\'un braisage.', example: 'Singer le bœuf bourguignon avant de mouiller.' },
  { word: 'Nacrer', category: 'Technique', definition: 'Revêtir les grains de riz d\'un film de matière grasse avant de mouiller — ils deviennent translucides.', example: 'Nacrer le riz à risotto dans le beurre 2 minutes.', origin: 'Car les grains deviennent nacrés, translucides' },
  { word: 'Incorporer', category: 'Technique', definition: 'Mélanger délicatement deux préparations en mouvements de bas en haut pour ne pas casser les bulles d\'air.', example: 'Incorporer les blancs en neige à la mousse au chocolat.' },
  { word: 'Écumer', category: 'Technique', definition: 'Retirer la mousse et les impuretés à la surface d\'un bouillon ou d\'une confiture en ébullition.', example: 'Écumer soigneusement le bouillon pendant les 10 premières minutes.' },
  { word: 'Filmer au contact', category: 'Technique', definition: 'Appliquer un film alimentaire directement sur la surface d\'une crème pour éviter la formation d\'une croûte.', example: 'Filmer la crème pâtissière au contact pour la refroidir.' },
  { word: 'Décanter', category: 'Technique', definition: 'Séparer un liquide de ses impuretés ou de ses éléments solides par repos ou filtration.', example: 'Décanter le beurre clarifié pour retirer le petit-lait.' },

  // === PÂTISSERIE ===
  { word: 'Sabler', category: 'Pâtisserie', definition: 'Incorporer le beurre à la farine du bout des doigts jusqu\'à consistance sableuse, sans développer le gluten.', example: 'Sabler la pâte brisée pour une tarte aux pommes.' },
  { word: 'Abaisser', category: 'Pâtisserie', definition: 'Étaler une pâte au rouleau jusqu\'à l\'épaisseur souhaitée, régulièrement, sans déchirer.', example: 'Abaisser la pâte feuilletée à 3mm d\'épaisseur.' },
  { word: 'Tourer', category: 'Pâtisserie', definition: 'Réaliser les tours de feuilletage : une série de pliages du beurre dans la détrempe.', example: 'Donner 6 tours simples pour une pâte feuilletée parfaite.' },
  { word: 'Beurre pommade', category: 'Pâtisserie', definition: 'Beurre ramolli à température ambiante (20°C) ayant la consistance crémeuse d\'une pommade.', example: 'Utiliser du beurre pommade pour crémer avec le sucre.' },
  { word: 'Ganache', category: 'Pâtisserie', definition: 'Émulsion de crème chaude versée sur du chocolat haché, lisse et brillante une fois refroidie.', example: 'Ganache 50/50 crème-chocolat pour une tarte au chocolat.' },
  { word: 'Praliné', category: 'Pâtisserie', definition: 'Amandes ou noisettes caramélisées, broyées en poudre (pralin) ou en pâte (praliné).', example: 'Crème mousseline pralinée pour le Paris-Brest.' },
  { word: 'Tant pour tant', category: 'Pâtisserie', definition: 'Mélange à parts égales (1:1) de sucre glace et de poudre d\'amandes — base des macarons.', origin: 'Français : deux ingrédients en proportion égale' },
  { word: 'Appareil', category: 'Pâtisserie', definition: 'Mélange de base semi-liquide entrant dans la composition d\'un entremets.', example: 'Appareil à crème brûlée = crème entière + jaunes + sucre.' },
  { word: 'Napper', category: 'Pâtisserie', definition: 'Recouvrir une préparation d\'une couche régulière de glaçage, sauce ou nappage.', example: 'Napper une charlotte de coulis de framboise.' },
  { word: 'Meringue italienne', category: 'Pâtisserie', definition: 'Blancs d\'œufs montés avec un sirop de sucre cuit à 121°C — stable, brillante, ne retombe pas.', example: 'Meringue italienne pour la tarte au citron meringuée.' },
  { word: 'Détrempe', category: 'Pâtisserie', definition: 'Première pâte du feuilletage (farine + eau + sel), avant l\'empâtage du beurre.', example: 'Préparer la détrempe la veille et la laisser reposer.' },
  { word: 'Crémer', category: 'Pâtisserie', definition: 'Fouetter du beurre pommade avec du sucre jusqu\'à blanchiment et texture aérée.', example: 'Crémer le beurre et le sucre 5 minutes pour les gâteaux de Madère.' },

  // === ÉPICES ===
  { word: 'Harissa', category: 'Épices', definition: 'Pâte de piments rouges nord-africaine, relevée et parfumée à la coriandre et au cumin.', origin: 'Tunisie, de l\'arabe harasa : écraser' },
  { word: 'Za\'atar', category: 'Épices', definition: 'Mélange moyen-oriental de thym sauvage, sumac, sésame grillé et sel.', origin: 'Arabe : thym sauvage' },
  { word: 'Sumac', category: 'Épices', definition: 'Épice acidulée rouge-bordeaux tirée des baies du sumac, très utilisée au Levant.', example: 'Saupoudrer le houmous de sumac et huile d\'olive.', origin: 'Arabo-persan : summāq' },
  { word: 'Garam masala', category: 'Épices', definition: 'Mélange indien d\'épices chaudes torréfiées : cannelle, cardamome, clou de girofle, poivre noir.', origin: 'Hindi : épices chaudes' },
  { word: 'Vadouvan', category: 'Épices', definition: 'Curry indien doux francisé, parfumé aux oignons frits et à l\'ail déshydratés.', origin: 'Tamil Nadu, adapté par la cuisine coloniale française' },

  // === CONDIMENT ===
  { word: 'Tahini', category: 'Condiment', definition: 'Pâte lisse de sésame grillé broyé, fondement du houmous et du baba ganoush.', origin: 'Arabe : طحينة (broyé)' },
  { word: 'Miso', category: 'Condiment', definition: 'Pâte fermentée de soja, sel et parfois céréales — fondement de la cuisine japonaise.', example: 'Miso blanc (doux) au petit-déjeuner, miso rouge (intense) pour les mijotés.', origin: 'Japonais : 味噌' },
  { word: 'Ponzu', category: 'Condiment', definition: 'Sauce citrus japonaise (yuzu + soja + mirin + kombu) fraîche et acidulée.', example: 'Trempette ponzu pour le shabu-shabu.' },
  { word: 'Rouille', category: 'Condiment', definition: 'Sauce provençale à l\'ail, safran et piment montée à l\'huile d\'olive, servie avec la bouillabaisse.', origin: 'Provençal : couleur orangée-rouille' },
  { word: 'Aïoli', category: 'Condiment', definition: 'Émulsion à l\'ail de Provence — une mayonnaise montée uniquement à l\'ail et à l\'huile d\'olive.', origin: 'Occitan : ail + huile' },
  { word: 'Persillade', category: 'Condiment', definition: 'Mélange d\'ail haché fin et de persil plat ciselé, ajouté en fin de cuisson.', example: 'Escargots en persillade et beurre.' },
  { word: 'Soffritto', category: 'Condiment', definition: 'Base aromatique méditerranéenne (oignon, ail, tomate) cuite longuement à feu doux.', example: 'Base du ragù bolognaise et de nombreuses sauces italiennes.', origin: 'Italien : sous-frit' },

  // === BOUILLON ===
  { word: 'Fond brun', category: 'Bouillon', definition: 'Bouillon corsé obtenu après torréfaction des os au four, base des grandes sauces.', example: 'Fond brun de veau pour une sauce au poivre.' },
  { word: 'Fond blanc', category: 'Bouillon', definition: 'Bouillon délicat de volaille ou de veau, os non rôtis, base des veloutés et blanquettes.', example: 'Fond blanc de volaille pour une sauce suprême.' },
  { word: 'Consommé', category: 'Bouillon', definition: 'Bouillon clarifié, concentré et parfaitement limpide, servi chaud ou en gelée.', example: 'Consommé double de volaille en entrée.' },
  { word: 'Nage', category: 'Bouillon', definition: 'Bouillon court aromatique parfumé dans lequel on poche des crustacés ou des filets de poisson.', example: 'Coquilles Saint-Jacques en nage de légumes.' },
  { word: 'Bouquet garni', category: 'Bouillon', definition: 'Aromates ficellés ensemble (thym, laurier, persil) pour parfumer les préparations longues.', example: 'Toujours retirer le bouquet garni avant de servir.' },

  // === GARNITURE ===
  { word: 'Panure à l\'anglaise', category: 'Garniture', definition: 'Triple enrobage : farine → œuf battu → chapelure, pour frire ou saisir à la poêle.', example: 'Escalope viennoise en panure anglaise.' },
  { word: 'Quenelle', category: 'Garniture', definition: 'Forme ovale et régulière donnée à une crème ou mousse en la façonnant entre deux cuillères.', example: 'Quenelle de glace au moment de servir le dessert.' },
  { word: 'Brunoise fine', category: 'Garniture', definition: 'Brunoise de 1mm — le plus petit format de découpe, pour des garnitures très raffinées.', example: 'Brunoise de poivrons pour décorer un carpaccio.' },

  // === ORGANISATION ===
  { word: 'Brigade', category: 'Organisation', definition: 'Organisation hiérarchique d\'une cuisine professionnelle : chef, sous-chef, chefs de partie, commis.', origin: 'Auguste Escoffier a codifié la brigade moderne au XIXe siècle' },
  { word: 'Garde-manger', category: 'Organisation', definition: 'Poste de la brigade gérant les entrées froides, charcuteries, salades et stocks réfrigérés.', origin: 'Littéralement : garde (protection) + manger (nourriture)' },
  { word: 'Dressage', category: 'Organisation', definition: 'Art de disposer les éléments d\'un plat dans l\'assiette avec harmonie visuelle et cohérence gustative.', example: 'Le dressage influence la perception du goût dès le premier regard.' },
  { word: 'Tournant', category: 'Organisation', definition: 'Cuisinier polyvalent de la brigade qui peut remplacer n\'importe quel poste de cuisine.', origin: 'Car il "tourne" d\'un poste à l\'autre' },
  { word: 'Commis', category: 'Organisation', definition: 'Jeune cuisinier débutant de la brigade, placé sous les ordres d\'un chef de partie.', origin: 'Français : commis (préposé)' },
];

const CATEGORIES = ['Tout', 'Couteau', 'Cuisson', 'Sauce', 'Technique', 'Pâtisserie', 'Épices', 'Condiment', 'Saveurs', 'Bouillon', 'Garniture', 'Organisation'];

export default function GlossaryScreen() {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tout');

  const filtered = CULINARY_TERMS.filter((t) => {
    const matchSearch = search.length < 2 || t.word.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tout' || t.category === activeCategory;
    return matchSearch && matchCat;
  }).sort((a, b) => a.word.localeCompare(b.word));

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>📚 Glossaire</Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: c.surfaceElevated, borderColor: c.border, color: c.text }]}
          placeholder="Rechercher un terme..."
          placeholderTextColor={c.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, { backgroundColor: activeCategory === cat ? c.primary : c.surfaceElevated, borderColor: activeCategory === cat ? c.primary : c.border }]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.catText, { color: activeCategory === cat ? '#fff' : c.textSecondary }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={[styles.count, { color: c.textMuted }]}>{filtered.length} terme{filtered.length > 1 ? 's' : ''}</Text>
        {filtered.map((term, i) => (
          <View key={i} style={[styles.card, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.word, { color: c.text }]}>{term.word}</Text>
              <View style={[styles.catBadge, { backgroundColor: c.primary + '20' }]}>
                <Text style={[styles.catBadgeText, { color: c.primary }]}>{term.category}</Text>
              </View>
            </View>
            <Text style={[styles.definition, { color: c.textSecondary }]}>{term.definition}</Text>
            {term.example && (
              <Text style={[styles.example, { color: c.textMuted }]}>Ex. : {term.example}</Text>
            )}
            {term.origin && (
              <Text style={[styles.origin, { color: c.primary }]}>🌍 {term.origin}</Text>
            )}
          </View>
        ))}
      </ScrollView>
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
  back: { fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  searchWrap: { padding: Layout.spacing.lg, paddingBottom: Layout.spacing.sm },
  searchInput: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    padding: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
  },
  catRow: { paddingHorizontal: Layout.spacing.lg, gap: Layout.spacing.sm, paddingBottom: Layout.spacing.sm },
  catChip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  catText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  list: { padding: Layout.spacing.lg, gap: Layout.spacing.sm, paddingBottom: 40 },
  count: { fontSize: Layout.fontSize.xs, marginBottom: Layout.spacing.xs },
  card: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    padding: Layout.spacing.md,
    gap: Layout.spacing.xs,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Layout.spacing.sm },
  word: { fontSize: Layout.fontSize.lg, fontWeight: '900', flex: 1 },
  catBadge: { borderRadius: Layout.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  catBadgeText: { fontSize: Layout.fontSize.xs, fontWeight: '700' },
  definition: { fontSize: Layout.fontSize.sm, lineHeight: 20 },
  example: { fontSize: Layout.fontSize.xs, fontStyle: 'italic' },
  origin: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
});
