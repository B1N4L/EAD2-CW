// Blog posts from the old WordPress site. Slugs match the old URLs.
// Only titles are here for now; each article's text comes from the owner's
// WordPress export and goes in the `body` field (paragraph strings).

export const BLOGS = [
  { slug: "sri-lankas-cultural-festivals-celebration-calendar-a-complete-guide-for-travelers", title: "Sri Lanka's Cultural Festivals & Celebration Calendar" },
  { slug: "hidden-waterfalls-natural-swimming-spots-in-sri-lanka-a-travelers-guide-to-secret-paradise-locations", title: "Hidden Waterfalls & Natural Swimming Spots in Sri Lanka" },
  { slug: "a-backpackers-guide-to-budget-travel-in-sri-lanka-how-to-explore-paradise-for-less", title: "A Backpacker's Guide to Budget Travel in Sri Lanka" },
  { slug: "sri-lankas-colonial-heritage-routes-exploring-dutch-portuguese-british-trails-beyond-galle", title: "Sri Lanka's Colonial Heritage Routes" },
  { slug: "foodie-trail-in-sri-lanka-discover-the-best-local-street-food-markets-and-regional-flavors", title: "Discover the Best Local Street Food Markets and Regional Flavors" },
  { slug: "scuba-diving-snorkeling-hotspots-around-sri-lanka-discover-coral-reefs-shipwrecks-and-marine-life", title: "Scuba Diving & Snorkeling Hotspots Around Sri Lanka" },
  { slug: "responsible-ethical-travel-in-sri-lanka-supporting-conservation-communities-and-sustainable-tourism", title: "Responsible & Ethical Travel in Sri Lanka" },
  // The old blog page linked this post to the wrong article, so its real URL is unknown; check it in the export.
  { slug: "tea-country-cycling-routes-plantation-homestays-in-sri-lanka", title: "Tea Country Cycling Routes & Plantation Homestays in Sri Lanka" },
  { slug: "the-pinnawala-elephant-orphanage-sri-lanka", title: "The Magic of Pinnawala Elephant Orphanage Sri Lanka" },
  { slug: "the-ultimate-guide-to-sri-lankas-top-attractions", title: "The Ultimate Guide to Sri Lanka's Top Attractions" },
  { slug: "ancient-kingdoms-sigiriya-sri-lanka-cultural-wonders", title: "Exploring Ancient Kingdoms: Sigiriya & More" },
  { slug: "sri-lanka-safari-adventures-wild-encounters", title: "Sri Lanka Safari Adventures" },
  { slug: "sri-lankas-train-journey-coastal-escapes", title: "Sri Lanka Kandy to Ella Train Ride & Coastal Escapes" },
  { slug: "best-beaches-in-sri-lanka-surfing-whale-watching", title: "The Best Beaches in Sri Lanka" },
  { slug: "best-time-to-visit-sri-lanka-weather-top-activities", title: "When to Visit Sri Lanka" },
  { slug: "travel-to-sri-lanka-perfect-holiday-for-families", title: "Sri Lanka for Every Traveler: Solo, Couple, Family, Friends" },
  { slug: "sri-lanka-travel-tips-for-international-visitors", title: "Essential Sri Lanka Travel Tips" },
  { slug: "sigiriya-rock-climb-sigiriya-village-tour", title: "Sigiriya and Sigiriya Village Tour" },
  { slug: "mirissa-sri-lanka-travel-guide", title: "Mirissa Beach Travel Guide" },
  { slug: "guide-to-sri-lanka-hiking-trails-waterfalls", title: "Sri Lanka Hiking Trails" },
  { slug: "jaffna-sri-lanka-travel-guide-explore-north-sri-lanka", title: "Jaffna Sri Lanka Travel Guide" },
  { slug: "how-to-see-sri-lanka-elephants-responsibly", title: "Responsible Encounters with Sri Lanka's Elephants" },
  { slug: "sri-lanka-ayurveda-retreats-yoga-wellness", title: "Sri Lanka Ayurveda Retreats" },
  { slug: "sri-lankan-foods-tour-street-eats-to-cooking-classes", title: "Sri Lankan Foods Tour" },
  { slug: "sri-lanka-beaches-on-the-east-and-south-coast", title: "Sri Lanka Beaches: East Coast vs South Coast" },
  { slug: "the-royal-and-the-wild-a-journey-from-ancient-polonnaruwa-and-habarana-safari-tour", title: "Polonnaruwa and Habarana Safari Tour" },
  { slug: "galle-fort-sri-lanka", title: "Galle Fort Sri Lanka: A Walk Through Time" },
  { slug: "ella-sri-lanka-little-adams-peak-hiking", title: "Hiking & Enjoying the Magical Destination, Ella Sri Lanka" },
  { slug: "adams-peak-climbing-for-a-sunrise-spectacle", title: "The Ultimate Guide to Climbing Adam's Peak, Sri Lanka" },
  { slug: "colombo-sri-lanka-dynamic-capital", title: "Colombo Sri Lanka: Your Ultimate Guide to the Capital City" },
  { slug: "sri-lanaka-east-coast-trincomalee-beaches", title: "Trincomalee Beaches Guide & Best Things to Do" },
  { slug: "experiencing-nuwara-eliya-tea-plantations", title: "Nuwara Eliya Tea Plantations: Sri Lanka's Emerald Estates" },
];

export const findBlog = (slug) => BLOGS.find((b) => b.slug === slug);
