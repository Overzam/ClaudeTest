// Curated Unsplash food photos — mapped by lesson title
// Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=800&q=80

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export const RECIPE_IMAGE_MAP: Record<string, string> = {
  // ── FRENCH ──────────────────────────────────────────────────────────────────
  'Les Bases du Couteau':     U('1556909114-f6e7ad7d3136'),
  'Les Sauces de Base':       U('1414235077428-338989a2e8c0'),
  'La Quiche Lorraine':       U('1565299507177-b84f25e3d3cd'),
  'Les Crêpes':               U('1567620905732-2d1ec7ab7445'),
  'Le Bœuf Bourguignon':      U('1504674900247-0877df9cc836'),
  'Le Soufflé au Fromage':    U('1608198093002-ad4e005484ec'),
  'La Ratatouille':           U('1512621776951-a57141f2eefd'),
  'Le Confit de Canard':      U('1555939594-58d7cb561ad1'),
  'La Tarte Tatin':           U('1571167366636-9f1ceb543f24'),
  'Le Pot-au-Feu':            U('1547592180-85f173990554'),
  'Les Gougères':             U('1516684732201-9f0c4eb0a4d4'),
  "La Bavette à l'Échalote":  U('1546548694-8e5de0769f5a'),
  'Le Coq au Vin':            U('1598515214211-89d3c73ae83b'),
  'La Vichyssoise':           U('1540420773420-6fc83f4e6ded'),
  "Le Canard à l'Orange":     U('1569050467447-ce54b3bbc37d'),
  'Les Oeufs Cocotte':        U('1482049016688-2d3e1b311543'),
  'La Brandade de Morue':     U('1519708227418-a8b54d773382'),
  'Le Paris-Brest':           U('1563245372-f21724e3856d'),
  'La Bouillabaisse':         U('1574894709920-11b28190daa8'),
  'Le Millefeuille':          U('1551183053-bf91798d4fad'),

  // ── ITALIAN ─────────────────────────────────────────────────────────────────
  'Le Pesto Genovese':            U('1473093226795-af9932fe5856'),
  'Les Gnocchi di Patate':        U('1476887334197-8580b4e8f58e'),
  'La Focaccia Genovese':         U('1565299507177-b84f25e3d3cd'),
  "L'Osso Buco à la Milanaise":   U('1504674900247-0877df9cc836'),
  'La Panna Cotta':               U('1563805042-7049a4d63a52'),
  'Les Arancini Siciliens':       U('1565299585323-38d6b0865b47'),
  'La Parmigiana di Melanzane':   U('1601050690597-df0568f70950'),
  'Cacio e Pepe Romaine':         U('1612929633738-8fe44f7ec841'),
  'Les Lasagne al Forno':         U('1567608285955-8d928e36ad45'),
  'La Polenta Crémeuse':          U('1546553009-d7f47ae9c8cf'),
  'Le Saltimbocca alla Romana':   U('1529695473023-14c00e44a5b9'),
  'La Ribollita Toscane':         U('1547592180-85f173990554'),
  'La Torta Caprese':             U('1578985545062-6d596e8c2b3a'),
  'Le Cannolo Sicilien':          U('1570145820259-b5f2b35a0e14'),

  // ── JAPANESE ────────────────────────────────────────────────────────────────
  'La Soupe Miso':        U('1549421263-5ec394a5ad4c'),
  'Les Gyoza':            U('1617196034183-421b4040ed20'),
  'Le Tonkatsu':          U('1562802378-063ec186a863'),
  "L'Oyakodon":           U('1547592180-85f173990554'),
  'Le Katsu Curry':       U('1585937421612-70a008356fbe'),
  'Les Onigiri':          U('1617196034234-66c2a4d1bb2d'),
  'Le Poulet Teriyaki':   U('1546548694-8e5de0769f5a'),
  "L'Udon en Bouillon":   U('1569050467447-ce54b3bbc37d'),
  "L'Okonomiyaki":        U('1567620832872-2b35ef8cce57'),
  'Les Mochi Maison':     U('1563805042-7049a4d63a52'),
  'Le Shabu-Shabu':       U('1555939594-58d7cb561ad1'),
  'Le Karaage':           U('1562802378-063ec186a863'),
  'Le Takoyaki':          U('1617196034194-4a20d025c48d'),
  'Le Matcha Parfait':    U('1572457994-7ef8a6e42f8d'),

  // ── MOROCCAN ────────────────────────────────────────────────────────────────
  'Le Couscous Royal':    U('1504674900247-0877df9cc836'),
  'Le Tajine de Poulet':  U('1598515214211-89d3c73ae83b'),
  "La Pastilla d'Agneau": U('1555939594-58d7cb561ad1'),
  'La Soupe Harira':      U('1540420773420-6fc83f4e6ded'),
  'La Harira':            U('1540420773420-6fc83f4e6ded'),
  'Les Briouates':        U('1565299507177-b84f25e3d3cd'),
  'La Chermoula':         U('1519708227418-a8b54d773382'),
  'Le Mechoui':           U('1555939594-58d7cb561ad1'),
  'Le Thé à la Menthe':   U('1556909114-f6e7ad7d3136'),

  // ── MEXICAN ─────────────────────────────────────────────────────────────────
  'Les Tacos al Pastor':   U('1565299585323-38d6b0865b47'),
  'Le Guacamole':          U('1512621776951-a57141f2eefd'),
  'Les Enchiladas':        U('1565299507177-b84f25e3d3cd'),
  'Le Pozole':             U('1540420773420-6fc83f4e6ded'),
  'Les Chilaquiles':       U('1547592180-85f173990554'),
  'Les Tamales':           U('1565299585323-38d6b0865b47'),
  'Les Churros con Chocolate': U('1516684732201-9f0c4eb0a4d4'),

  // ── INDIAN ──────────────────────────────────────────────────────────────────
  'Le Poulet Tikka Masala': U('1585937421612-70a008356fbe'),
  'Le Dal Makhani':         U('1547592180-85f173990554'),
  'Le Palak Paneer':        U('1512621776951-a57141f2eefd'),
  'Le Samosa':              U('1565299585323-38d6b0865b47'),
  'Le Lassi Mangue':        U('1563805042-7049a4d63a52'),
  'Le Dosa':                U('1567620905732-2d1ec7ab7445'),
  'Le Gulab Jamun':         U('1571167366636-9f1ceb543f24'),

  // ── THAI ────────────────────────────────────────────────────────────────────
  'Le Pad Thaï':             U('1473093226795-af9932fe5856'),
  'Le Tom Yum':              U('1540420773420-6fc83f4e6ded'),
  'Le Som Tum':              U('1512621776951-a57141f2eefd'),
  'Le Massaman Curry':       U('1585937421612-70a008356fbe'),
  'Les Rouleaux de Printemps Frais': U('1551183053-bf91798d4fad'),
  'Le Khao Man Gai':         U('1598515214211-89d3c73ae83b'),
  'Le Mango Sticky Rice':    U('1563805042-7049a4d63a52'),

  // ── GREEK ───────────────────────────────────────────────────────────────────
  'La Moussaka':          U('1504674900247-0877df9cc836'),
  'Le Tzatziki':          U('1563805042-7049a4d63a52'),
  'La Spanakopita':       U('1565299507177-b84f25e3d3cd'),
  'Le Souvlaki':          U('1555939594-58d7cb561ad1'),
  'La Fava Santorini':    U('1547592180-85f173990554'),
  'Les Loukoumades':      U('1571167366636-9f1ceb543f24'),
  "L'Agneau de Pâques":   U('1546548694-8e5de0769f5a'),

  // ── CHINESE ─────────────────────────────────────────────────────────────────
  'Le Kung Pao Poulet':   U('1562802378-063ec186a863'),
  'Les Bao Buns':         U('1617196034183-421b4040ed20'),
  'Les Nouilles Lo Mein': U('1473093226795-af9932fe5856'),
  'La Soupe Won Ton':     U('1549421263-5ec394a5ad4c'),
  "Les Egg Tarts":        U('1563245372-f21724e3856d'),

  // ── PASTRY ──────────────────────────────────────────────────────────────────
  'Les Macarons':                  U('1563245372-f21724e3856d'),
  'Le Croissant':                  U('1565299507177-b84f25e3d3cd'),
  'La Tarte au Citron Meringuée':  U('1571167366636-9f1ceb543f24'),
  'Le Fondant au Chocolat':        U('1578985545062-6d596e8c2b3a'),
  'Les Financiers':                U('1516684732201-9f0c4eb0a4d4'),
  'La Mousse au Chocolat':         U('1563805042-7049a4d63a52'),
  'Le Saint-Honoré':               U('1563245372-f21724e3856d'),

  // ── BBQ ─────────────────────────────────────────────────────────────────────
  'Les Ribs BBQ':                  U('1555939594-58d7cb561ad1'),
  'La Côte de Bœuf':               U('1546548694-8e5de0769f5a'),
  'Les Ailes de Poulet Buffalo':   U('1562802378-063ec186a863'),
  'Le Saumon sur Planche de Cèdre': U('1519708227418-a8b54d773382'),
  'Les Légumes Grillés':           U('1512621776951-a57141f2eefd'),
  'Le Smash Burger':               U('1568901346375-23c9450c58cd'),
  'La Sauce BBQ Maison':           U('1504674900247-0877df9cc836'),

  // ── VEGAN ───────────────────────────────────────────────────────────────────
  'Le Jackfruit Pulled Pork':   U('1512621776951-a57141f2eefd'),
  'Les Falafels Croustillants': U('1565299585323-38d6b0865b47'),
  'La Tarte aux Légumes de Saison': U('1565299507177-b84f25e3d3cd'),
  'Le Banana Nice Cream':       U('1563805042-7049a4d63a52'),
  'Le Lait Végétal Maison':     U('1519708227418-a8b54d773382'),
};

/** Thumbnail for lesson nodes — same mapping, reuses recipe photos */
export const LESSON_THUMBNAIL_MAP: Record<string, string> = RECIPE_IMAGE_MAP;

/** Path cover photos */
export const PATH_IMAGE_MAP: Record<string, string> = {
  french:   U('1414235077428-338989a2e8c0'),
  italian:  U('1473093226795-af9932fe5856'),
  japanese: U('1617196034183-421b4040ed20'),
  moroccan: U('1504674900247-0877df9cc836'),
  mexican:  U('1565299585323-38d6b0865b47'),
  indian:   U('1585937421612-70a008356fbe'),
  thai:     U('1512621776951-a57141f2eefd'),
  greek:    U('1555939594-58d7cb561ad1'),
  chinese:  U('1562802378-063ec186a863'),
  pastry:   U('1563245372-f21724e3856d'),
  bbq:      U('1546548694-8e5de0769f5a'),
  vegan:    U('1540420773420-6fc83f4e6ded'),
};
