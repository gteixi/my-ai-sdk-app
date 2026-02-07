/**
 * Schema examples and constants for structured data generation
 * Contains example prompts for each schema type
 */

import type { SchemaExamplesMap, SchemaType } from '@/types/structured';

/**
 * Example prompts and metadata for each schema type
 * Each schema has a label, icon, and multiple example prompts
 */
export const SCHEMA_EXAMPLES: SchemaExamplesMap = {
  roadBike: {
    label: 'Road Bike',
    icon: '🚴',
    examples: [
      "Canyon Ultimate CF SLX 8, 2024 racing bike. Carbon frame weighs 780g with race geometry. Shimano Ultegra Di2 12-speed electronic groupset. DT Swiss wheels with 40mm depth, tubeless ready. Full bike 7.2kg, priced at $5,500. Features include integrated cables, aerodynamic frame design, disc brakes. Popular among amateur racers and enthusiasts.",
      "Massi Team Carbon, 2024 endurance bike. Carbon frame 900g with comfortable geometry. Shimano 105 11-speed mechanical groupset. Massi carbon wheels. Complete bike 8.1kg, $2,800. Spanish brand known for value, great for long rides and sportives.",
      "Specialized S-Works Tarmac SL8, 2024 racing bike. Carbon frame weighs 700g with aggressive geometry. SRAM Red eTap AXS 12-speed wireless electronic. Roval Rapide CLX II wheels with 51mm depth. 6.8kg total, $14,000. Features Rider-First Engineered design, Future Shock suspension. Used by pro teams, Tour de France winner bike.",
      "Canyon Aeroad CF SL 8, 2024 aero racing bike. Carbon frame 850g with aggressive aerodynamic geometry. Shimano Ultegra Di2 12-speed electronic groupset. DT Swiss ARC 1400 wheels with 62mm depth. Complete bike 7.4kg, $6,200. German engineering, wind tunnel tested, integrated cockpit. Great value for aero performance.",
      "Massi Galant Pro, 2023 endurance bike. Aluminum frame with carbon fork, comfortable geometry. Shimano Tiagra 10-speed mechanical groupset. Alex wheels. Complete bike 9.2kg, $1,400. Entry-level road bike, perfect for beginners and casual riders. Spanish quality at accessible price.",
      "Specialized Roubaix Expert, 2024 endurance bike. Carbon frame 950g with Future Shock suspension. Shimano Ultegra Di2 12-speed electronic. Roval C38 wheels. 7.8kg total, $7,500. Endurance geometry, designed for comfort on long rides and rough roads. Used by Paris-Roubaix riders.",
    ],
  },
  album: {
    label: 'Music Album',
    icon: '🎵',
    examples: [
      "My 21st Century Blues by Raye, released 2023. R&B and soul album on Human Re Sources label. Features hit single 'Escapism' (3:45) featuring 070 Shake. Track 'Black Mascara' (3:28) discusses personal struggles. The album has 13 tracks total including 'The Thrill Is Gone' (4:12), 'Ice Cream Man' (3:51). Co-produced by Raye, Mike Sabath, and others. Won 6 BRIT Awards in 2024 including Album of the Year. Praised for honest storytelling and vocal performance. 4.5/5 rating.",
      "Stripped by Christina Aguilera, 2002. Pop and R&B album on RCA Records. 20 tracks including 'Beautiful' (3:58), 'Fighter' (4:03), 'Can't Hold Us Down' (4:20) featuring Lil' Kim, 'Dirrty' (4:58) featuring Redman. Produced by Linda Perry, Scott Storch, and others. Won Grammy Award for Best Female Pop Vocal Performance. Over 12 million copies sold worldwide. Known for empowerment themes and vocal prowess. 4.5/5 rating.",
      "I Am... Sasha Fierce by Beyoncé, 2008. R&B and pop album on Columbia Records. Double album with hits 'Halo' (4:21), 'Single Ladies (Put a Ring on It)' (3:13), 'If I Were a Boy' (4:09), 'Sweet Dreams' (3:28). 11 tracks total. Produced by Beyoncé, Stargate, Darkchild, and others. Won 6 Grammy Awards including Song of the Year for 'Single Ladies'. Sold over 8 million copies worldwide. Dual personality concept album. 5/5 rating.",
      "Lemonade by Beyoncé, 2016. Visual album on Parkwood/Columbia Records. 12 tracks including 'Formation' (3:26), 'Sorry' (3:52), 'Hold Up' (3:41), 'Freedom' (4:49) featuring Kendrick Lamar. Produced by Beyoncé, The-Dream, Mike Will Made It, and others. Won 2 Grammy Awards including Best Urban Contemporary Album. Sold over 2.5 million copies in the US. Accompanied by a 65-minute film. Themes of infidelity, empowerment, and Black identity. 5/5 rating.",
      "Back to Basics by Christina Aguilera, 2006. Pop and soul album on RCA Records. Double album with 22 tracks including 'Ain't No Other Man' (3:48), 'Hurt' (4:01), 'Candyman' (3:43). Produced by DJ Premier, Linda Perry, Mark Ronson. Won Grammy for Best Female Pop Vocal Performance. Over 5 million copies sold worldwide. Jazz and blues influences, vintage aesthetic. 4/5 rating.",
      "4 by Beyoncé, 2011. R&B and pop album on Columbia/Parkwood Records. 12 tracks including 'Love On Top' (4:27), 'Countdown' (3:32), 'Run the World (Girls)' (3:56), 'Best Thing I Never Had' (4:14). Produced by Beyoncé, The-Dream, Babyface, Ryan Tedder. Debuted at number one on Billboard 200. Inspired by Fela Kuti and 1990s R&B. Personal and emotional album. 4.5/5 rating.",
    ],
  },
  recipe: {
    label: 'Recipe',
    icon: '🍳',
    examples: [
      "Pasta Carbonara: You'll need 400g spaghetti, 200g guanciale or pancetta, 4 eggs, 100g Pecorino Romano cheese, black pepper, salt. Cook pasta al dente. Fry guanciale until crispy. Beat eggs with grated cheese. Mix hot pasta with guanciale, remove from heat, add egg mixture quickly while tossing. The heat cooks the eggs creating a creamy sauce. Season with lots of black pepper. Serves 4, medium difficulty, 10 min prep, 20 min cook. Italian cuisine. 600 calories per serving.",
      "Tiramisu: You'll need 6 egg yolks, 3/4 cup sugar, 500g mascarpone cheese, 2 cups heavy cream, 2 packs ladyfingers (savoiardi), 1.5 cups strong espresso (cooled), 3 tbsp Marsala wine or rum, cocoa powder for dusting. Whip egg yolks with sugar until pale, fold in mascarpone and whipped cream. Mix espresso with Marsala. Quickly dip ladyfingers in coffee mixture (don't soak), layer in dish with mascarpone cream, repeat layers. Dust generously with cocoa powder. Refrigerate 4-6 hours or overnight. Serves 8-10, medium difficulty, 30 min prep. Italian dessert classic. 400 calories per serving.",
      "Paella Valenciana: Need 500g rice (bomba or short grain), 1kg chicken pieces, 300g rabbit (optional), 200g green beans, 200g butter beans, 4 tomatoes, 1L chicken stock, saffron threads, paprika, olive oil, garlic, rosemary. In a paella pan, brown meat, add vegetables, tomatoes, paprika. Add rice, distribute evenly, pour hot stock with saffron. Cook on medium-high 10 minutes, then low 10 minutes. Don't stir! Let socarrat (crispy bottom) form. Rest 5 minutes. Serves 6, hard difficulty, 20 min prep, 40 min cook. Spanish cuisine, traditional Valencian dish. 550 calories per serving.",
      "Risotto alla Milanese: Need 350g Arborio rice, 1L chicken or vegetable stock, 1/2 cup white wine, 1 onion finely chopped, 50g butter, 50g Parmesan cheese, saffron threads, olive oil. Heat stock, steep saffron in it. Sauté onion in butter and oil until soft. Add rice, toast 2 minutes. Add wine, let evaporate. Add stock ladle by ladle, stirring constantly, wait until absorbed before adding more. After 18-20 minutes rice should be creamy and al dente. Stir in butter and Parmesan. Serves 4, medium difficulty, 5 min prep, 30 min cook. Italian cuisine, Northern Italy specialty. 450 calories per serving.",
      "Gazpacho Andaluz: Need 1kg ripe tomatoes, 1 cucumber, 1 green bell pepper, 1 small onion, 2 garlic cloves, 3 tbsp sherry vinegar, 100ml olive oil, 200g stale bread, salt, water. Blend tomatoes, peeled cucumber, pepper, onion, garlic with soaked bread until smooth. Add vinegar, oil, salt while blending. Thin with cold water to desired consistency. Chill 2-4 hours. Serve cold with diced vegetables as garnish. Serves 6, easy difficulty, 15 min prep plus chilling. Spanish cuisine, perfect for summer. 180 calories per serving.",
      "Crema Catalana: You'll need 500ml whole milk, 4 egg yolks, 100g sugar, 20g cornstarch, lemon zest, cinnamon stick, sugar for caramelizing. Heat milk with lemon zest and cinnamon. Beat egg yolks with sugar and cornstarch. Remove zest and cinnamon from milk, slowly pour into egg mixture whisking constantly. Return to heat, cook stirring until thick (don't boil). Pour into shallow dishes, chill 4 hours. Before serving, sprinkle sugar on top and caramelize with torch or under broiler. Serves 6, medium difficulty, 10 min prep, 15 min cook plus chilling. Catalan dessert, similar to crème brûlée. 280 calories per serving.",
    ],
  },
} as const;

/**
 * Get a random example for a schema type
 * @param schemaType - The schema type to get an example for
 * @returns A random example prompt string
 */
export function getRandomExample(schemaType: SchemaType): string {
  const examples = SCHEMA_EXAMPLES[schemaType].examples;
  return examples[Math.floor(Math.random() * examples.length)];
}

/**
 * Get all example prompts for a schema type
 * @param schemaType - The schema type to get examples for
 * @returns Array of example prompt strings
 */
export function getAllExamples(schemaType: SchemaType): string[] {
  return SCHEMA_EXAMPLES[schemaType].examples;
}

/**
 * Get schema metadata (label and icon)
 * @param schemaType - The schema type to get metadata for
 * @returns Object with label and icon
 */
export function getSchemaMetadata(schemaType: SchemaType) {
  const { label, icon } = SCHEMA_EXAMPLES[schemaType];
  return { label, icon };
}
