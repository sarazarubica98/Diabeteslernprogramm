function replaceTitleWithSpokenText(title){
    title = title.replace("Cashew", "Käschju");
    title = title.replace("Darvida", "Darviida");
    title = title.replace("1/2", "ein halber");
    title = title.replace("1/4", "ein viertel");
    title = title.replace("1 1/2 - 2", "ein einhalb bis zwei");
    title = title.replace("2 - 2 1/2", "zwei bis zweieinhalb");
    title = title.replace("etc.", "ecetera");
    title = title.replace("(180g)", "");

    title = title.replace("0 (0g)", "null");
    title = title.replace("0.1 (1g)", "null komma eins");
    title = title.replace("0.3 (3g)", "0.3");
    title = title.replace("0.5 (5g)", "einen halben");
    title = title.replace("0.9 (9g)", "0.9");
    title = title.replace("1 (10g)", "einen");
    title = title.replace("1.5 (15g)", "eineinhalb");
    title = title.replace("2 (20g)", "zwei");
    title = title.replace("2.5 (25g)", "zweieinhalb");
    title = title.replace("3 (30g)", "drei");
    title = title.replace("3.5 (35g)", "dreieinhalb");
    title = title.replace("4 (40g)", "vier");
    title = title.replace("4.5 (45g)", "viereinhalb");
    title = title.replace("5 (50g)", "fünf");
    title = title.replace("5.5 (55g)", "fünfeinhalb");
    title = title.replace("6 (60g)", "sechs");
    title = title.replace("6.5 (65g)", "sechseinhalb");
    title = title.replace("7 (70g)", "sieben");
    title = title.replace("7.5 (75g)", "siebeneinhalb");
    title = title.replace("8 (80g)", "acht");
    title = title.replace("8.5 (85g)", "achteinhalb");
    title = title.replace("9 (90g)", "neun");
    title = title.replace("9.5 (95g)", "neuneinhalb");
    title = title.replace("10 (100g)", "zehn");
    title = title.replace("14 (140g)", "vierzehn");
    title = title.replace("12.5 (125g)", "zwölf komma fünf");

    //Brotwerte ohne Gramm
    title = title.replace("0 Brotwerte", "null Brotwerte");
    title = title.replace("0.5 Brotwerte", "ein halber Brotwert");
    title = title.replace("1 Brotwert", "einen Brotwert");
    title = title.replace("1.5 Brotwerte", "eineinhalb Brotwerte");
    title = title.replace("2.5 Brotwerte", "zweieinhalb Brotwerte");
    title = title.replace("3.5 Brotwerte", "dreieinhalb Brotwerte");
    title = title.replace("4.5 Brotwerte", "viereinhalb Brotwerte");
    title = title.replace("5.5. Brotwerte", "fünfeinhalb Brotwerte");
    title = title.replace("6.5 Brotwerte", "sechseinhalb Brotwerte");
    title = title.replace("7.5 Brotwerte", "siebeneinhalb Brotwerte");
    title = title.replace("8.5 Brotwerte", "achteinhalb Brotwerte");
    title = title.replace("9.5 Brotwerte", "neuneinhalb Brotwerte");

    //Milchwerte ohne Gramm
    title = title.replace("0 Milchwerte", "null Milchwerte");
    title = title.replace("0.5 Milchwerte", "ein halber Milchwert");
    title = title.replace("1 Milchwert", "einen Milchwert");
    title = title.replace("1.5 Milchwerte", "eineinhalb Milchwerte");
    title = title.replace("2.5 Milchwerte", "zweieinhalb Milchwerte");
    title = title.replace("3.5 Milchwerte", "dreieinhalb Milchwerte");
    title = title.replace("4.5 Milchwerte", "viereinhalb Milchwerte");
    title = title.replace("5.5. Milchwerte", "fünfeinhalb Milchwerte");
    title = title.replace("6.5 Milchwerte", "sechseinhalb Milchwerte");
    title = title.replace("7.5 Milchwerte", "siebeneinhalb Milchwerte");
    title = title.replace("8.5 Milchwerte", "achteinhalb Milchwerte");
    title = title.replace("9.5 Milchwerte", "neuneinhalb Milchwerte");

    //Kohlenhydratwerte ohne Gramm
    title = title.replace("0 Kohlenhydratwerte", "null Kohlenhydratwerte");
    title = title.replace("0.5 Kohlenhydratwerte", "ein halber Kohlenhydratwert");
    title = title.replace("1 Kohlenhydratwert", "einen Kohlenhydratwerte");
    title = title.replace("1.5 Kohlenhydratwerte", "eineinhalb Kohlenhydratwerte");
    title = title.replace("2.5 Kohlenhydratwerte", "zweieinhalb Kohlenhydratwerte");
    title = title.replace("3.5 Kohlenhydratwerte", "dreieinhalb Kohlenhydratwerte");
    title = title.replace("4.5 Kohlenhydratwerte", "viereinhalb Kohlenhydratwerte");
    title = title.replace("5.5. Kohlenhydratwerte", "fünfeinhalb Kohlenhydratwerte");
    title = title.replace("6.5 Kohlenhydratwerte", "sechseinhalb Kohlenhydratwerte");
    title = title.replace("7.5 Kohlenhydratwerte", "siebeneinhalb Kohlenhydratwerte");
    title = title.replace("8.5 Kohlenhydratwerte", "achteinhalb Kohlenhydratwerte");
    title = title.replace("9.5 Kohlenhydratwerte", "neuneinhalb Kohlenhydratwerte");

    //Obstwerte ohne Gramm
    title = title.replace("0 Obstwerte", "null Obstwerte");
    title = title.replace("0.5 Obstwerte", "ein halber Kohlenhydratwert");
    title = title.replace("1 Obstwert", "einen Obstwert");
    title = title.replace("1.5 Obstwerte", "eineinhalb Obstwerte");
    title = title.replace("2.5 Obstwerte", "zweieinhalb Obstwerte");
    title = title.replace("3.5 Obstwerte", "dreieinhalb Obstwerte");
    title = title.replace("4.5 Obstwerte", "viereinhalb Obstwerte");
    title = title.replace("5.5. Obstwerte", "fünfeinhalb Obstwerte");
    title = title.replace("6.5 Obstwerte", "sechseinhalb Obstwerte");
    title = title.replace("7.5 Obstwerte", "siebeneinhalb Obstwerte");
    title = title.replace("8.5 Obstwerte", "achteinhalb Obstwerte");
    title = title.replace("9.5 Obstwerte", "neuneinhalb Obstwerte");

    //Halbe Zahlen
    title = title.replace("1.5", "ein einhalb");
    title = title.replace("2.5", "zwei einhalb");
    title = title.replace("3.5", "drei einhalb");
    title = title.replace("4.5", "vier einhalb");
    title = title.replace("5.5", "fünf einhalb");
    title = title.replace("6.5", "sechs einhalb");
    title = title.replace("7.5", "sieben einhalb");
    title = title.replace("8.5", "acht einhalb");
    title = title.replace("9.5", "neun einhalb");

    title = title.replace("1-2 Zwischenmahlzeiten", "ein bis zwei Zwischenmahlzeiten");
    title = title.replace("1 Zwischenmahlzeit", "eine Zwischenmahlzeit");

    title = title.replace("Fondue, Raclette", "Fondü, Raklet");
    title = title.replace("z. B", " zum Beispiel");
    title = title.replace("sollte/n", "sollte sollten");
    title = title.replace("mmol/l", "Millimol pro Liter");
    title = title.replace("entspricht 0.5 Obstwerten.", "entspricht null Komma fünf Obstwerten.");

    return title;
  }