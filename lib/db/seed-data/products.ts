/**
 * PUXX Ireland Product Seed Data
 * 14 Premium Tobacco-Free Nicotine Pouches
 *
 * All products priced at €15.00
 * Free delivery over €150
 * 18+ only
 */

export interface ProductSeedData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  nicotine_strength: string;
  flavor: string;
  ingredients: string;
  is_featured: boolean;
  is_active: boolean;
  stock_quantity: number;
  flavor_profile: string;
  usage_instructions: string;
  warning_label: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  image_url: string;
}

export const productsSeedData: ProductSeedData[] = [
  {
    name: 'PUXX Cool Mint',
    slug: 'cool-mint',
    description: `Experience the ultimate refreshment with PUXX Cool Mint nicotine pouches. This premium tobacco-free pouch delivers an invigorating blast of icy mint that awakens your senses with every use. Perfectly balanced between cooling menthol and sweet mint, Cool Mint offers a smooth, long-lasting flavor experience that keeps you refreshed throughout the day.

Crafted for those who demand the highest quality, PUXX Cool Mint combines pharmaceutical-grade nicotine with natural mint extracts to create a pouch that's as clean as it is satisfying. Available in multiple strengths to suit every user, from those just starting out to experienced users who prefer a stronger experience.

Each pouch is meticulously engineered using premium plant-based fibers that ensure optimal comfort and minimal drip. The slim, discreet design fits comfortably under your lip and remains invisible to others, allowing you to enjoy nicotine satisfaction anywhere - at work, in social settings, or during travel.

The cooling sensation of PUXX Cool Mint isn't just refreshing; it's transformative. Unlike traditional mint products that fade quickly, our advanced flavor technology ensures that the crisp, clean taste persists for up to 40 minutes per pouch. The initial burst of coolness gradually mellows into a satisfying, steady mint flavor that doesn't overwhelm.

What sets PUXX Cool Mint apart is our commitment to purity. We use only food-grade ingredients, natural flavors, and premium nicotine extracted through state-of-the-art processes. Each pouch is completely tobacco-free, eliminating the harmful chemicals and unpleasant odors associated with traditional tobacco products. Your teeth stay white, your breath stays fresh, and your health stays protected.

Irish customers choose PUXX Cool Mint for its reliability and consistency. Every can contains 20 perfectly portioned pouches, each delivering the same exceptional quality and strength. Whether you're navigating Dublin's busy streets, enjoying Ireland's countryside, or simply seeking a cleaner alternative to smoking, PUXX Cool Mint provides the nicotine satisfaction you crave without compromise.`,
    short_description: 'Invigorating icy mint with satisfying nicotine. Available in 3mg–30mg. Tobacco-free, long-lasting, and incredibly refreshing.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Cool Mint',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural mint flavoring, natural menthol, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: true,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Intense cooling menthol with sweet mint undertones. Crisp, clean, and endlessly refreshing.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Cool Mint - Premium Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Cool Mint tobacco-free nicotine pouches in Ireland. Available in 3mg–30mg strengths. Icy refreshing flavor, discreet & long-lasting. Free delivery over €150.',
    meta_keywords: 'cool mint nicotine pouches, PUXX Ireland, tobacco-free, mint pouches Ireland',
    image_url: 'puxxcoolmint16mg.jpg'
  },
  {
    name: 'PUXX Spearmint',
    slug: 'spearmint',
    description: `Discover the perfect balance of sweetness and freshness with PUXX Spearmint nicotine pouches. Unlike harsh peppermint varieties, our Spearmint blend offers a gentler, sweeter mint experience that's both soothing and invigorating. This 22mg strength option delivers powerful nicotine satisfaction wrapped in a delightfully smooth spearmint flavor.

PUXX Spearmint captures the essence of fresh spearmint leaves with remarkable authenticity. From the moment you place the pouch under your lip, you'll experience a wave of natural sweetness that distinguishes spearmint from its cooler mint cousins. This flavor profile appeals to those who appreciate mint's refreshing qualities but prefer a warmer, more aromatic experience.

Our tobacco-free formula represents the pinnacle of modern nicotine delivery. By eliminating tobacco entirely, we've created a product that's cleaner, fresher, and significantly healthier than traditional snus or chewing tobacco. PUXX Spearmint contains no carcinogenic tobacco-specific nitrosamines (TSNAs), no tar, and produces no smoke or vapor - just pure, satisfying nicotine delivery.

The 22mg nicotine content positions PUXX Spearmint as our premium strength option, ideal for experienced users who demand robust satisfaction. The nicotine releases gradually over 30-40 minutes, providing a steady, controlled experience without the peaks and valleys associated with smoking. This consistent delivery helps manage cravings effectively while allowing you to remain productive and focused.

Quality control is paramount in every aspect of PUXX Spearmint production. Our Swedish-inspired manufacturing process ensures each pouch meets exacting standards for nicotine content, moisture levels, and flavor consistency. The soft, white pouches are pre-portioned for convenience and won't stain your teeth or compromise your smile.

Irish customers particularly appreciate PUXX Spearmint during social occasions when traditional tobacco use would be inappropriate or impossible. Whether you're attending a wedding, enjoying a meal at a restaurant, or spending time with family, PUXX Spearmint provides discreet satisfaction without disturbing others or violating smoke-free policies. The pleasant spearmint aroma is subtle and inoffensive, a welcome departure from tobacco's lingering odor.`,
    short_description: 'Sweet, smooth spearmint flavor. Available in 3mg–30mg. Gentler than peppermint, perfect for all-day use.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Spearmint',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural spearmint flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: true,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet, aromatic spearmint with gentle cooling. Smooth and soothing.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Spearmint - Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Spearmint nicotine pouches in Ireland. Sweet, smooth flavour, available in 3mg–30mg strengths. Tobacco-free & discreet. Free delivery over €150.',
    meta_keywords: 'spearmint nicotine pouches, PUXX Ireland, tobacco-free Ireland',
    image_url: 'puxxspearmint16mg.jpg'
  },
  {
    name: 'PUXX Peppermint',
    slug: 'peppermint',
    description: `Indulge in the classic, bold taste of PUXX Peppermint nicotine pouches. For those who appreciate traditional mint flavors, our Peppermint blend delivers an authentic, robust peppermint experience that stands the test of time. With 22mg nicotine strength, this premium pouch combines powerful satisfaction with timeless flavor.

Peppermint has been celebrated for centuries for its invigorating properties and distinctive taste. PUXX Peppermint honors this legacy by using only natural peppermint extracts sourced from the finest mint plants. The result is a flavor that's instantly recognizable yet refined - sharper than spearmint, warmer than menthol, and absolutely satisfying.

What makes PUXX Peppermint exceptional is our dedication to flavor authenticity. Many nicotine pouches rely on artificial flavoring that tastes chemical or synthetic. We reject that approach entirely. Our peppermint flavor comes from real peppermint oil, carefully balanced to provide consistent taste throughout the pouch's 30-40 minute lifespan. The flavor doesn't spike and crash; it delivers steady satisfaction from start to finish.

The 22mg nicotine strength makes PUXX Peppermint our most potent offering, designed for adults who require robust nicotine delivery. Whether you're transitioning from heavy cigarette use or you've developed a tolerance to lower-strength products, PUXX Peppermint meets your needs without excess. The pharmaceutical-grade nicotine is absorbed efficiently through the oral mucosa, providing rapid onset and sustained effect.

Health-conscious Irish consumers choose PUXX Peppermint as a cleaner alternative to smoking and vaping. Our tobacco-free formula eliminates exposure to the thousands of harmful chemicals found in cigarette smoke. There's no combustion, no tar, no carbon monoxide - just pure nicotine delivered in the most efficient way possible. Your lungs will thank you, and so will everyone around you.

The discrete nature of PUXX Peppermint cannot be overstated. The slim, white pouches remain invisible under your lip, allowing you to use them in any setting without drawing attention. Office meetings, public transport, family gatherings - PUXX Peppermint fits seamlessly into your life. The fresh peppermint scent is pleasant and natural, never overpowering or obvious to others.`,
    short_description: 'Bold, authentic peppermint flavor. Available in 3mg–30mg. Classic taste, modern delivery.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Peppermint',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural peppermint oil, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: true,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Bold, sharp peppermint with warming undertones. Traditional and authentic.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Peppermint - Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Peppermint nicotine pouches in Ireland. Bold peppermint flavor, available in 3mg–30mg strengths, tobacco-free. Free delivery over €150. Order today!',
    meta_keywords: 'peppermint nicotine pouches, PUXX Ireland, strong nicotine pouches, Ireland',
    image_url: 'puxxpeppermint16mg.jpg'
  },
  {
    name: 'PUXX Cherry',
    slug: 'cherry',
    description: `Treat yourself to the sweet, fruity delight of PUXX Cherry nicotine pouches. Bursting with authentic cherry flavor, this 16mg strength option offers the perfect balance between satisfying nicotine delivery and delicious taste. For those who prefer fruit flavors over traditional mint, PUXX Cherry is an absolute revelation.

Our Cherry flavor captures the essence of ripe, sweet cherries at their peak. Unlike artificial cherry products that taste like cough medicine or candy, PUXX Cherry delivers genuine fruit flavor that's both sophisticated and satisfying. We use natural cherry extracts and flavor compounds to create a taste experience that's true to the fruit itself - slightly tart, wonderfully sweet, and incredibly enjoyable.

The 16mg nicotine strength positions PUXX Cherry as our medium-strength option, ideal for users who want solid nicotine satisfaction without the intensity of our 22mg products. This makes Cherry perfect for all-day use, providing consistent relief from cravings without overwhelming your system. Many Irish customers use PUXX Cherry as their primary pouch, appreciating its balanced strength and exceptional flavor.

PUXX Cherry represents our commitment to flavor innovation in the nicotine pouch category. While mint varieties dominate the market, we recognize that many users crave variety and excitement in their nicotine experience. Cherry delivers exactly that - a refreshing departure from minty monotony that makes every pouch feel like a treat rather than a routine.

The tobacco-free formula is particularly important for fruit-flavored products. Traditional tobacco's harsh, bitter taste would overwhelm delicate cherry notes. By eliminating tobacco entirely, we've created space for the cherry flavor to shine brilliantly. You'll taste pure, clean cherry from the moment you insert the pouch until you remove it 30-40 minutes later.

Irish customers love PUXX Cherry for social occasions and leisure time. The sweet, approachable flavor makes nicotine use feel less clinical and more enjoyable. Whether you're relaxing at home, socializing with friends, or taking a break from work, PUXX Cherry adds a touch of pleasure to your nicotine routine. The discreet pouches won't stain your teeth or leave telltale signs of use.`,
    short_description: 'Sweet, authentic cherry flavor with 16mg nicotine. A fruity alternative to traditional mint pouches.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Cherry',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural cherry flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: true,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet cherry with subtle tartness. Fruity, refreshing, and incredibly satisfying.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Cherry - Fruity Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Cherry nicotine pouches in Ireland. Sweet cherry flavor, available in 3mg–20mg strengths, tobacco-free. Free delivery over €150. Order now!',
    meta_keywords: 'cherry nicotine pouches, fruit flavored pouches Ireland, PUXX Ireland',
    image_url: 'puxxcherry16mg.jpg'
  },
  {
    name: 'PUXX Watermelon',
    slug: 'watermelon',
    description: `Refresh yourself with PUXX Watermelon nicotine pouches - the taste of summer in every pouch. This 16mg strength option combines juicy watermelon flavor with satisfying nicotine delivery, creating an experience that's as enjoyable as it is effective. Perfect for those who want their nicotine with a side of tropical paradise.

Watermelon is nature's ultimate refreshment, and PUXX Watermelon captures this essence perfectly. Our flavor scientists have crafted a profile that balances watermelon's characteristic sweetness with its subtle, refreshing notes. The result is a flavor that tastes genuinely fruity without being overly candied or artificial. Each pouch delivers a burst of summer, regardless of Ireland's weather.

What distinguishes PUXX Watermelon from other fruit-flavored pouches is our commitment to natural flavoring. We source premium watermelon extracts and combine them with complementary flavor notes to create depth and complexity. The initial taste is bright and sweet, gradually revealing more nuanced melon characteristics as the pouch develops. This evolution keeps the experience interesting throughout the 30-40 minute use period.

The 16mg nicotine strength makes PUXX Watermelon accessible to a wide range of users. It's strong enough to satisfy experienced nicotine users but not so intense that it overwhelms newcomers to high-strength pouches. This versatility makes Watermelon an excellent choice for those building their PUXX collection or exploring different strength levels.

Tobacco-free means taste-free when it comes to tobacco's unpleasant characteristics. PUXX Watermelon contains absolutely no tobacco leaf, stem, or dust. Instead, we use pharmaceutical-grade synthetic nicotine that's chemically identical to tobacco-derived nicotine but without the impurities and contaminants. This ensures a cleaner, purer experience that lets the watermelon flavor truly shine.

Irish customers particularly enjoy PUXX Watermelon during warmer months and outdoor activities. The refreshing flavor complements sunny days, beach trips, and social gatherings. The pouches are completely discreet, allowing you to enjoy nicotine satisfaction while remaining fully engaged in your activities. No smoke, no smell, no mess - just pure, fruity enjoyment.`,
    short_description: 'Juicy watermelon flavor with refreshing 16mg nicotine strength. Summer in a pouch.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Watermelon',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural watermelon flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet, juicy watermelon with refreshing finish. Light, fruity, and summery.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Watermelon - Refreshing Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Watermelon nicotine pouches in Ireland. Juicy watermelon flavor, available in 3mg–30mg strengths, tobacco-free. Free delivery over €150. Shop now!',
    meta_keywords: 'watermelon nicotine pouches, PUXX Ireland, fruit pouches, Ireland',
    image_url: 'puxxwatermelon16mg.jpg'
  },
  {
    name: 'PUXX Cola',
    slug: 'cola',
    description: `Experience the iconic taste of cola in PUXX Cola nicotine pouches. This innovative 16mg strength option brings together the beloved flavor of classic cola with modern nicotine delivery technology. For those seeking something truly different in the nicotine pouch category, PUXX Cola delivers unexpected satisfaction.

Cola flavor is instantly recognizable worldwide, evoking nostalgia and comfort. PUXX Cola recreates this classic taste with remarkable accuracy, capturing the complex blend of vanilla, cinnamon, citrus, and caramel notes that define authentic cola flavor. Unlike simple sweet flavors, cola's complexity provides a rich, layered taste experience that evolves throughout use.

Our flavor development process for PUXX Cola involved extensive research and testing. We studied premium cola beverages to understand their exact flavor profiles, then recreated these characteristics using natural flavor compounds and extracts. The result is a pouch that genuinely tastes like cola - not a vague approximation, but the real deal in nicotine pouch form.

The 16mg nicotine strength complements the cola flavor perfectly. It's substantial enough to provide meaningful satisfaction but balanced enough to allow the complex cola taste to shine. The nicotine releases gradually over 30-40 minutes, providing steady relief from cravings while you enjoy the familiar, comforting taste of cola.

PUXX Cola's tobacco-free formula is essential to its success. Tobacco's bitter, harsh taste would destroy cola's delicate flavor balance. By building our pouches on plant-based fibers and using pure, pharmaceutical-grade nicotine, we've created a clean canvas for the cola flavor. What you taste is cola - pure, simple, and satisfying.

Irish customers love PUXX Cola for its uniqueness and approachability. The familiar flavor makes nicotine pouches less intimidating for newcomers while providing variety for experienced users tired of mint overload. Cola is universally loved, making these pouches easy to appreciate regardless of your flavor preferences. The discreet pouches fit seamlessly into any lifestyle, providing cola-flavored satisfaction anywhere, anytime.`,
    short_description: 'Classic cola flavor with 16mg nicotine. Nostalgic taste meets modern nicotine delivery.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Cola',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural cola flavoring (vanilla, cinnamon, citrus, caramel notes), food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Complex cola flavor with vanilla, cinnamon, and citrus notes. Sweet, familiar, and satisfying.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Cola - Unique Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Cola nicotine pouches in Ireland. Classic cola flavor, available in 3mg–30mg strengths, tobacco-free. Free delivery over €150. Order today!',
    meta_keywords: 'cola nicotine pouches, PUXX Ireland, unique flavors',
    image_url: 'puxxcola16mg.jpg'
  },
  {
    name: 'PUXX Citrus',
    slug: 'citrus',
    description: `Energize your senses with PUXX Citrus nicotine pouches. This vibrant 16mg strength option combines tangy citrus flavor with satisfying nicotine delivery, creating a zesty experience that awakens and refreshes. For those who appreciate bright, uplifting flavors, PUXX Citrus is the perfect choice.

Our Citrus blend is a carefully orchestrated symphony of lemon, lime, orange, and grapefruit notes. Rather than focusing on a single citrus fruit, we've created a complex profile that captures the best characteristics of multiple varieties. The result is a flavor that's bright without being harsh, tangy without being sour, and refreshing without being overwhelming.

PUXX Citrus delivers exceptional flavor longevity. Citrus notes are naturally volatile and can fade quickly in inferior products. Our advanced encapsulation technology preserves the citrus oils and flavor compounds, ensuring they release gradually throughout the 30-40 minute use period. The flavor remains vibrant from start to finish, never becoming dull or flat.

The 16mg nicotine strength makes PUXX Citrus ideal for daytime use and active lifestyles. It provides substantial nicotine satisfaction without the heavy intensity of stronger options. Many Irish customers use Citrus as their morning or afternoon pouch, appreciating its energizing flavor and balanced strength. The bright taste pairs perfectly with coffee, tea, or just fresh air.

Tobacco-free means citrus-forward in PUXX Citrus. Without tobacco's dark, earthy notes competing for attention, the citrus flavor can truly shine. We use only premium citrus extracts sourced from real fruits, combined with natural flavor enhancers that amplify the tangy, refreshing characteristics. Every pouch tastes clean, fresh, and authentically citrusy.

The discrete nature of PUXX Citrus makes it perfect for professional environments. The fresh citrus scent is subtle and pleasant, similar to having recently eaten an orange or enjoyed citrus-scented hand lotion. Unlike tobacco products that announce themselves with unpleasant odors, PUXX Citrus remains your secret. The slim, white pouches stay invisible under your lip, allowing you to maintain nicotine satisfaction throughout your workday without any social stigma or policy violations.`,
    short_description: 'Bright, tangy citrus blend with 16mg nicotine. Refreshing and energizing.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Citrus',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural citrus flavoring (lemon, lime, orange, grapefruit extracts), food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Bright citrus blend with lemon, lime, and orange notes. Tangy, refreshing, and uplifting.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Citrus - Zesty Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Citrus nicotine pouches in Ireland. Bright citrus flavor, available in 3mg–30mg strengths, tobacco-free. Free delivery over €150. Order now!',
    meta_keywords: 'citrus nicotine pouches, PUXX Ireland, lemon lime pouches',
    image_url: 'puxxcitrus16mg.jpg'
  },
  {
    name: 'PUXX Strawberry',
    slug: 'strawberry',
    description: `Savor the sweet, luscious taste of PUXX Strawberry nicotine pouches. This delightful flavor option brings the essence of ripe, sun-kissed strawberries to the nicotine pouch category. For those who love berry flavors and appreciate fruity sophistication, PUXX Strawberry delivers pure, red-berry bliss.

Strawberry is universally beloved for its perfect balance of sweetness and subtle tartness. PUXX Strawberry honors this profile by using natural strawberry extracts that capture the fruit at its peak ripeness. Unlike artificial strawberry flavors that taste like candy or medicine, our formulation tastes genuinely fruity - like biting into a fresh, juicy strawberry on a summer day.

Our flavor scientists worked tirelessly to perfect PUXX Strawberry's taste profile. Strawberry flavor is notoriously difficult to execute well; too sweet and it becomes cloying, too tart and it loses its appeal. We've found the sweet spot - a flavor that's recognizably strawberry, pleasantly sweet, and subtly complex. The taste evolves throughout use, revealing different facets of strawberry character as the pouch develops.

The nicotine strength in PUXX Strawberry provides reliable satisfaction for regular users. Whether you're transitioning from smoking or you've been using nicotine pouches for years, Strawberry delivers consistent relief from cravings. The nicotine releases gradually over 30-40 minutes, providing smooth, sustained satisfaction without spikes or crashes.

PUXX Strawberry's tobacco-free formula is crucial to its flavor integrity. Tobacco's bitter, harsh taste would completely overwhelm strawberry's delicate sweetness. By eliminating tobacco and building our pouches on clean, plant-based materials, we've created the perfect vehicle for strawberry flavor. What you taste is pure fruit - no chemical aftertaste, no tobacco bitterness, just sweet, satisfying strawberry.

Irish customers adore PUXX Strawberry for its approachable, friendly flavor. Strawberry is familiar and comforting, making these pouches perfect for all-day use. The sweet taste makes nicotine consumption feel less clinical and more enjoyable. Whether you're working, relaxing, or socializing, PUXX Strawberry adds a touch of fruity pleasure to your routine. The discreet pouches won't stain your teeth or betray your nicotine use to others.`,
    short_description: 'Sweet, ripe strawberry flavor with satisfying nicotine strength. Berry lovers\' favorite.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Strawberry',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural strawberry flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet strawberry with subtle tartness. Fresh, fruity, and delicious.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Strawberry - Premium Berry Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Strawberry nicotine pouches in Ireland. Sweet strawberry flavor, tobacco-free, discreet. Free delivery over €150. Shop now!',
    meta_keywords: 'strawberry nicotine pouches, berry pouches Ireland, PUXX Ireland, fruit flavored nicotine',
    image_url: 'Strawberry.jpg'
  },
  {
    name: 'PUXX Raspberry',
    slug: 'raspberry',
    description: `Indulge in PUXX Raspberry nicotine pouches - where tart meets sweet in perfect harmony. This sophisticated berry flavor delivers complexity and depth that berry enthusiasts crave. For those who appreciate nuanced fruit flavors with character, PUXX Raspberry offers an exceptional nicotine pouch experience.

Raspberry stands apart from other berries with its distinctive tartness and aromatic complexity. PUXX Raspberry captures these characteristics beautifully, delivering authentic raspberry flavor that's both recognizable and refined. We use natural raspberry extracts that preserve the fruit's natural tartness while highlighting its sweet undertones, creating a flavor profile that's balanced and endlessly enjoyable.

The flavor journey of PUXX Raspberry is particularly noteworthy. Upon insertion, you'll experience an initial burst of bright, tart raspberry. As the pouch develops over the next 30-40 minutes, sweeter notes emerge, creating a flavor evolution that keeps each use interesting. This dynamic flavor profile prevents monotony and makes every pouch feel fresh and engaging.

Our nicotine formulation in PUXX Raspberry delivers consistent, reliable satisfaction. The pharmaceutical-grade nicotine is carefully measured to ensure each pouch contains exactly the right amount for effective craving relief. The absorption through oral mucosa is efficient and predictable, providing onset within minutes and sustained effect throughout use.

PUXX Raspberry's tobacco-free construction is fundamental to its success. Raspberry's delicate flavor characteristics would be completely lost if combined with tobacco's overwhelming bitterness. Our clean, plant-based formula allows the raspberry flavor to express itself fully. You taste pure fruit with every pouch - no tobacco interference, no chemical aftertaste, just natural berry goodness.

Irish customers choose PUXX Raspberry for its sophistication and flavor depth. It's not a simple, one-note sweetness; it's a complex berry experience that appeals to discerning palates. The tart-sweet balance makes these pouches refreshing without being cloying, perfect for extended use throughout the day. The discreet format allows you to enjoy premium raspberry flavor anywhere - in meetings, at social events, or during leisure time - without anyone knowing.`,
    short_description: 'Tart-sweet raspberry flavor with sophisticated depth. Complex berry taste for discerning users.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Raspberry',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural raspberry flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Tart raspberry with sweet undertones. Complex, aromatic, and sophisticated.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Raspberry - Berry Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Raspberry nicotine pouches in Ireland. Tart-sweet berry flavor, tobacco-free, premium quality. Free delivery over €150. Order today!',
    meta_keywords: 'raspberry nicotine pouches, berry pouches Ireland, PUXX Ireland, premium nicotine pouches',
    image_url: 'Raspberry.jpg'
  },
  {
    name: 'PUXX Blueberry',
    slug: 'blueberry',
    description: `Discover the mellow, sweet satisfaction of PUXX Blueberry nicotine pouches. This gentle berry flavor offers a softer alternative to tart fruits while delivering full nicotine satisfaction. For those who prefer subtle, sweet flavors over bold, intense ones, PUXX Blueberry is the perfect companion.

Blueberry is nature's gentle berry - sweet, mild, and universally appealing. PUXX Blueberry captures this characteristic perfectly, delivering authentic blueberry flavor that's never overwhelming or artificial. We use natural blueberry extracts that preserve the fruit's subtle sweetness and delicate aroma, creating a flavor that's comforting and satisfying rather than aggressive or intense.

The flavor profile of PUXX Blueberry is designed for extended enjoyment. Unlike sharp, acidic flavors that can become tiresome, blueberry's mild character makes it ideal for all-day use. The sweetness is present but never cloying, the berry notes are clear but never overpowering. This balance makes PUXX Blueberry one of our most versatile flavors, appropriate for any time of day and any situation.

Our nicotine delivery in PUXX Blueberry is consistent and dependable. Each pouch releases nicotine gradually over 30-40 minutes, providing smooth, sustained satisfaction. The mild flavor doesn't distract from the nicotine experience; instead, it enhances it, making each use pleasant and effective. Whether you're managing intense cravings or maintaining steady nicotine levels, PUXX Blueberry delivers.

The tobacco-free formula is essential for preserving blueberry's delicate flavor. Tobacco would completely overpower blueberry's subtle sweetness, rendering the flavor unrecognizable. By eliminating tobacco and using only premium, plant-based materials, we've created space for blueberry to shine. The result is a clean, pure berry experience with every pouch.

Irish customers appreciate PUXX Blueberry for its gentle, approachable character. It's an excellent choice for those new to nicotine pouches, as the familiar, friendly flavor makes the experience less intimidating. Long-time users love it for variety and for situations where bold flavors would be excessive. The discrete pouches fit seamlessly into any lifestyle, providing sweet blueberry satisfaction without any social complications or health concerns associated with traditional tobacco.`,
    short_description: 'Mellow, sweet blueberry flavor with smooth nicotine delivery. Gentle and approachable.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Blueberry',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural blueberry flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet, mild blueberry. Gentle, smooth, and comforting.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Blueberry - Mild Berry Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Blueberry nicotine pouches in Ireland. Sweet, mild berry flavor, tobacco-free, smooth delivery. Free delivery over €150. Shop now!',
    meta_keywords: 'blueberry nicotine pouches, mild berry pouches Ireland, PUXX Ireland, sweet nicotine pouches',
    image_url: 'Blueberry.jpg'
  },
  {
    name: 'PUXX Grape',
    slug: 'grape',
    description: `Experience the rich, sweet satisfaction of PUXX Grape nicotine pouches. This bold fruit flavor brings the taste of purple grapes to the nicotine pouch category, offering a unique alternative to berries and citrus. For those seeking distinctive, memorable flavors, PUXX Grape delivers an unforgettable experience.

Grape flavor is instantly recognizable and universally loved. PUXX Grape captures the essence of sweet, juicy purple grapes with remarkable authenticity. We've crafted a flavor that balances grape's characteristic sweetness with subtle tart notes, creating a profile that's satisfying without being candy-like or artificial. Each pouch delivers genuine grape taste that evolves and develops throughout use.

The flavor technology in PUXX Grape ensures long-lasting taste satisfaction. Grape notes are carefully preserved through encapsulation techniques that release flavor gradually over 30-40 minutes. Unlike inferior products where flavor fades quickly, PUXX Grape maintains its bold grape character from start to finish. The taste remains vibrant and engaging throughout the entire use period.

Our nicotine formulation in PUXX Grape provides robust satisfaction for regular users. The pharmaceutical-grade nicotine is precisely measured and efficiently delivered through the oral mucosa. You'll feel the effects within minutes, with steady satisfaction lasting throughout the pouch's lifespan. This reliable delivery makes PUXX Grape an excellent choice for managing cravings and maintaining nicotine levels.

PUXX Grape's tobacco-free formula is critical to its flavor success. Grape is a bold flavor, but it's not strong enough to overcome tobacco's harsh bitterness. By eliminating tobacco entirely, we've created a clean foundation for the grape flavor to flourish. You taste pure, sweet grape with every pouch - no tobacco interference, no unpleasant aftertaste, just fruity satisfaction.

Irish customers love PUXX Grape for its fun, approachable flavor. It's reminiscent of childhood grape candies and drinks but sophisticated enough for adult consumption. The bold taste makes nicotine use enjoyable rather than purely functional. Whether you're working, relaxing, or socializing, PUXX Grape adds a touch of fruity pleasure to your day. The discreet pouches remain invisible under your lip, allowing you to enjoy grape-flavored nicotine satisfaction anywhere without drawing attention.`,
    short_description: 'Rich, sweet grape flavor with bold character. Fun and satisfying.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Grape',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural grape flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet purple grape with subtle tartness. Bold, memorable, and fun.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Grape - Bold Fruit Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Grape nicotine pouches in Ireland. Rich grape flavor, tobacco-free, distinctive taste. Free delivery over €150. Order today!',
    meta_keywords: 'grape nicotine pouches, PUXX Ireland, fruit flavored pouches, unique nicotine flavors',
    image_url: 'Grape.jpg'
  },
  {
    name: 'PUXX Peach',
    slug: 'peach',
    description: `Delight in the smooth, sweet taste of PUXX Peach nicotine pouches. This luxurious fruit flavor captures the essence of ripe, juicy peaches at their absolute best. For those who appreciate soft, sweet flavors with sophisticated depth, PUXX Peach offers an exceptional nicotine pouch experience.

Peach is one of nature's most beloved fruits, celebrated for its perfect sweetness and delicate aroma. PUXX Peach honors this reputation by using premium natural peach extracts that capture the fruit's subtle complexity. Unlike artificial peach flavors that taste one-dimensional or candy-like, our formulation delivers authentic peach character - sweet but not cloying, fruity but not overwhelming, smooth and satisfying.

The flavor journey of PUXX Peach is particularly enjoyable. Upon initial insertion, you'll experience a burst of bright, sweet peach. As the pouch develops over 30-40 minutes, deeper, more nuanced peach notes emerge, revealing the flavor's full complexity. This evolution keeps each use interesting and prevents flavor fatigue even with regular, repeated use throughout the day.

Our nicotine delivery in PUXX Peach is smooth and consistent. The pharmaceutical-grade nicotine releases gradually through the oral mucosa, providing rapid onset and sustained satisfaction. Whether you're managing acute cravings or maintaining steady nicotine levels, PUXX Peach delivers reliable results. The gentle flavor complements rather than competes with the nicotine experience.

PUXX Peach's tobacco-free formula is essential for preserving the fruit's delicate character. Peach flavor is subtle and sophisticated - characteristics that would be completely destroyed by tobacco's harsh bitterness. By building our pouches on clean, plant-based materials and using only premium ingredients, we've created the perfect showcase for peach flavor. What you taste is pure fruit sweetness with every pouch.

Irish customers adore PUXX Peach for its elegant, refined flavor. It's sophisticated without being pretentious, sweet without being excessive, and fruity without being childish. The smooth taste makes these pouches perfect for all-day use and special occasions alike. The discreet format allows you to enjoy premium peach flavor in any setting - professional environments, social gatherings, or quiet moments alone - without any complications or concerns.`,
    short_description: 'Smooth, sweet peach flavor with elegant depth. Sophisticated and luxurious.',
    price: 15.00,
    nicotine_strength: '16mg',
    flavor: 'Peach',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural peach flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet, smooth peach with subtle complexity. Elegant, refined, and delicious.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Peach - Elegant Fruit Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Peach nicotine pouches in Ireland. Smooth peach flavor, tobacco-free, refined taste. Free delivery over €150. Shop now!',
    meta_keywords: 'peach nicotine pouches, PUXX Ireland, elegant fruit pouches, premium nicotine',
    image_url: 'Peach.jpg'
  },
  {
    name: 'PUXX Wintergreen',
    slug: 'wintergreen',
    description: `Experience the bold, refreshing power of PUXX Wintergreen nicotine pouches. This classic flavor delivers an intense, cooling sensation that's beloved by traditional tobacco users making the switch to cleaner alternatives. For those who appreciate strong, minty flavors with substantial character, PUXX Wintergreen is the ultimate choice.

Wintergreen is a legendary flavor in the tobacco and nicotine world, known for its distinctive cooling effect and robust minty-sweet taste. PUXX Wintergreen honors this tradition while elevating it to tobacco-free excellence. We use natural wintergreen oil extracted from genuine wintergreen plants, ensuring authentic flavor that's immediately recognizable to anyone familiar with classic wintergreen products.

The flavor intensity of PUXX Wintergreen is substantial and unapologetic. This isn't a subtle, background flavor - it's bold, present, and commanding. The initial cooling sensation is powerful, followed by sweet, minty notes that persist throughout the 30-40 minute use period. For those transitioning from traditional wintergreen tobacco products, PUXX Wintergreen provides familiar comfort with modern cleanliness.

Our nicotine formulation in PUXX Wintergreen delivers robust satisfaction suitable for experienced users. The pharmaceutical-grade nicotine is efficiently absorbed, providing rapid onset and sustained effect. The strong flavor complements the nicotine delivery, creating a complete experience that satisfies both taste and craving. This makes Wintergreen ideal for those who demand maximum impact from their nicotine pouches.

PUXX Wintergreen's tobacco-free formula represents a significant health improvement over traditional wintergreen snus or chewing tobacco. By eliminating tobacco leaf entirely, we've removed exposure to harmful tobacco-specific nitrosamines (TSNAs), tar, and thousands of other toxic chemicals. You get the authentic wintergreen flavor you love without the health risks you don't. It's a true win-win for wintergreen enthusiasts.

Irish customers who grew up with traditional tobacco products particularly appreciate PUXX Wintergreen. It provides a bridge between old habits and modern alternatives, delivering familiar flavor in a cleaner, more socially acceptable format. The discreet pouches allow you to enjoy powerful wintergreen satisfaction anywhere - at work, in public, at home - without smoke, smell, or social stigma. Your teeth stay white, your breath stays fresh, and your health stays protected.`,
    short_description: 'Bold wintergreen flavor with intense cooling. Classic taste for experienced users.',
    price: 15.00,
    nicotine_strength: '20mg',
    flavor: 'Wintergreen',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural wintergreen oil, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Bold wintergreen with intense cooling. Strong, minty-sweet, and powerful.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Wintergreen - Classic Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Wintergreen nicotine pouches in Ireland. Bold wintergreen flavor, available in 3mg–30mg strengths, tobacco-free. Free delivery over €150. Order now!',
    meta_keywords: 'wintergreen nicotine pouches, PUXX Ireland, classic flavor Ireland',
    image_url: 'puxxwintergreen20mg.jpg'
  },
  {
    name: 'PUXX Apple Mint',
    slug: 'apple-mint',
    description: `Discover the gentle, refreshing taste of PUXX Applemint nicotine pouches. This unique 6mg strength option combines crisp apple sweetness with cool mint freshness, creating a flavor that's both invigorating and approachable. Perfect for those new to nicotine pouches or anyone who prefers lower strength with exceptional flavor.

Applemint is a distinctive flavor combination that brings together two beloved tastes. The apple notes provide natural sweetness and fruity character, while mint adds refreshing coolness and complexity. The result is a flavor that's greater than the sum of its parts - neither purely fruity nor purely minty, but a harmonious blend that's uniquely satisfying.

The 6mg nicotine strength makes PUXX Applemint our gentlest option, ideal for several user profiles. New nicotine pouch users will appreciate the mild strength that allows them to acclimate without overwhelming intensity. Those reducing nicotine consumption will find 6mg perfect for gradual tapering. Social users who enjoy nicotine occasionally rather than constantly will appreciate the moderate effect that doesn't dominate their experience.

Our flavor technology in PUXX Applemint ensures balanced taste throughout use. The apple and mint flavors are carefully calibrated to complement each other, with neither overwhelming the other. The initial taste is bright and fresh, gradually settling into a comfortable, sustained flavor that lasts 30-40 minutes. This balance makes Applemint suitable for extended, repeated use throughout the day.

PUXX Applemint's tobacco-free formula is particularly important for showcasing its delicate flavor combination. Both apple and mint are subtle flavors that would be completely overpowered by tobacco's harsh bitterness. By building our pouches on clean, plant-based materials, we've created space for both flavors to express themselves fully. The result is a pure, clean taste experience with every pouch.

Irish customers love PUXX Applemint for its versatility and approachability. The mild strength makes it suitable for nearly anyone, while the unique flavor keeps things interesting. It's perfect for daytime use when strong nicotine might be excessive, for social situations where you want mild satisfaction, or for anyone building a varied pouch collection. The discreet pouches fit seamlessly into any lifestyle, providing gentle apple-mint refreshment without any complications.`,
    short_description: 'Crisp apple meets cool mint. Available in 3mg–30mg. Perfect for newcomers and light users.',
    price: 15.00,
    nicotine_strength: '6mg',
    flavor: 'Apple Mint',
    ingredients: 'Plant-based fibers, pharmaceutical-grade nicotine, natural apple flavoring, natural mint flavoring, food-grade fillers (maltitol, cellulose), stabilizers (hydroxypropyl cellulose), acidity regulators (sodium carbonate, sodium bicarbonate), natural sweeteners.',
    is_featured: false,
    is_active: true,
    stock_quantity: 500,
    flavor_profile: 'Sweet apple with refreshing mint. Balanced, gentle, and approachable.',
    usage_instructions: 'Place one pouch under your upper lip. Keep in place for up to 40 minutes. Do not chew or swallow. Dispose of responsibly after use.',
    warning_label: 'This product contains nicotine. Nicotine is an addictive substance. 18+ only. Not for use by non-smokers, pregnant or breastfeeding women.',
    meta_title: 'PUXX Apple Mint - Mild Nicotine Pouches Ireland',
    meta_description: 'Buy PUXX Apple Mint nicotine pouches in Ireland. Crisp apple-mint flavor, available in 3mg–30mg strengths, tobacco-free. Free delivery over €150!',
    meta_keywords: 'apple mint nicotine pouches, PUXX Ireland, mild nicotine pouches, beginner friendly',
    image_url: 'puxxapplemint6mg.jpg'
  }
];
