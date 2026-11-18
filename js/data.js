/* ==========================================================================
   Portfolio content (Assignment 3)
   Everything here comes from my ITD 211 Digital Visualization design journal
   (term 251): the three projects, three selected assignments and six selected in-class exercises.
   The objectives, process notes and reflections are the journal's own text.
   `kind` is "Project" or "Assignment"; `sequence` is the journal order.
   ========================================================================== */

/* eslint-disable no-unused-vars */
var PROJECTS = [
  {
    id: 'hidden-gate',
    sequence: 1,
    title: 'Hidden Gate Game',
    kind: 'Project',
    year: 2025,
    tags: ['Unity', 'Blender', 'Game design'],
    image: 'assets/images/hidden-gate-1.jpg',
    summary: 'An exploration adventure where Rocky collects five fragments to unlock a hidden gate, built with Blender and Unity.',
    process: 'Concept: Hidden Gate is an exploration adventure centered around Rocky’s journey to discover the hidden gate. The player explores the environment, searches through the area, and collects five scattered fragments needed to unlock the gate. Through discovery, movement, and progression, the experience builds excitement until Rocky finally opens the Hidden Gate. Character: the character was designed using Blender, starting with sculpting based on a reference to define the overall form and proportions. Environment: the environment was created in Blender by blocking out the layout using basic shapes, with modifiers used to improve efficiency. Gamification design: in Unity, assets were imported from Blender (FBX) and scenes (main menu, options, gameplay) were organized with a structured folder system. Fragments were connected to a collector script so when picked they disappear with particle and sound effects; the UI (Play, Options, Quit) was built under Canvas and linked to scripts; the character was updated with animations set up in the Animator Controller (idle, walk, run, jump).',
    learning: 'Challenges: activating the gate only after collecting five fragments was challenging; this was fixed by implementing a script that tracks collected items and triggers the gate once all fragments are obtained. Player engagement: maintaining player excitement during fragment collection was challenging; this was fixed by using engaging background music to keep the player motivated and immersed.'
  },
  {
    id: 'unidine',
    sequence: 2,
    title: 'UniDine: Smart Meal Planning App',
    kind: 'Project',
    year: 2025,
    tags: ['UX research', 'App concept', 'Service design'],
    image: 'assets/images/unidine-1.jpg',
    summary: 'A smart meal planning app concept: improve meal quantity estimates and let students reserve meals and earn reward points.',
    process: 'Objective: Improve meal quantity estimates to enhance the dining experience. Allow students to reserve meals and earn reward points for free meals. Stakeholder analysis: the most important stakeholders are Students (main users), Cafeteria Management (runs services) and University Administration (provides approval and support); the key relationships are Students and Cafeteria Management (demand), Cafeteria Management and University Administration (support), and Cafeteria Management and Kitchen Staff (operations). Knowledge gap analysis: assumptions and gaps rated 1–5 for risk to project success — customers/students will commit to the app (5, attitudinal), the peak hours and seasons are unknown (3, behavioral/factual), the average daily customer numbers are unknown (4, behavioral), and the prize will encourage the customers/students (4, attitudinal). Survey analysis: the survey was conducted on a small scale with 14 students to study the project’s knowledge gaps — the majority of students have experienced shortages before, breakfast and lunch are twice as common as dinner, most students are interested in trying the app, and 80% showed interest in a free meal reward. Interview analysis: problems faced during peak hours (avoiding peak hours, waiting a long time, overcrowding annoyance), experience of food shortage (late arrival with no food, favorite food runs out, frequent occurrence) and suggestions for improvement (prefer a website, informative notifications only, clear interface and accurate menu). Benchmarking: NUSmart Dining App, choosi and Nutrislice compared by user, format, usability, estimation and experience.',
    learning: 'From the survey and interviews, it was clear that students often face food shortages and long waiting times, especially during peak hours. Benchmarking with other smart dining apps showed how pre-ordering and accurate demand tracking can reduce these issues. The UniDine app builds on these insights by helping the cafeteria prepare the right portions, reducing waste, and encouraging student commitment through rewards. The next step will involve testing the UniDine app with a larger group of students to validate its effectiveness.'
  },
  {
    id: 'hero-journey',
    sequence: 3,
    title: 'The Hero Journey',
    kind: 'Project',
    year: 2025,
    tags: ['Blender', 'Character animation', 'Sculpting'],
    image: 'assets/images/hero-journey-1.jpg',
    summary: 'A character animation exploring identity and self-awareness: a hero chasing his shadow as it fades away.',
    process: 'Concept: This project focuses on storytelling through character animation, exploring the concept of identity and self-awareness. The narrative follows a main character chasing a shadow that represents external judgments and expectations, gradually realizing that these influences do not define who they are. The project combines sculpting, texturing, rigging, and animation in Blender, along with simulations and camera work to build an emotional and cinematic experience. Sculpting head and body: the head and body were created using Blender’s sculpting tools, starting from a base mesh; brushes like Grab, Clay and Smooth were used to shape the form and refine facial features and body proportions. Texture and rigging: the texture was created and refined using vertex paint, with reference images used to match realistic skin tones; the rig was built bone by bone to ensure accurate structure and control. Simulations and animation: each movement was controlled by adding keyframes to different parts of the body, an earthquake simulation was applied with table objects parented to the wall, and smoke and fade simulations were applied to the shadow.',
    learning: 'Understanding how to combine storytelling with character design, apply the full character workflow (sculpting, rigging, animation), and use camera movement and simulation to enhance emotional impact and narrative delivery.'
  },
  {
    id: 'taif-rose-perfume-branding',
    sequence: 4,
    title: 'Taif Rose Perfume Branding',
    kind: 'Project',
    year: 2025,
    tags: ['Photoshop', 'InDesign', 'Branding'],
    image: 'assets/images/taif-rose-perfume-branding-1.jpg',
    summary: 'A perfume brand inspired by the Taif Rose, turning its cultural value into a modern visual identity in Photoshop and InDesign.',
    process: 'Objective: Create a perfume brand inspired by the Taif Rose, highlighting its cultural value and transforming it into a modern visual identity. Research: Studied the history, harvesting process, and cultural meaning of Taif Rose. Ideation: Explored logo shapes inspired by rose petals and Saudi aesthetics. Prototype: Designed early logo variations, color palettes, and layout tests. Final execution: logo creation (Photoshop), advertisement design using real rose field imagery, 4-page booklet layout (InDesign), color palette + patterns + product mockups.',
    learning: 'This project improved my skills in branding, layout design, and using Photoshop and InDesign together. I learned how cultural elements can be translated into a modern identity and how color, imagery, and composition influence the final message. Feedback helped refine alignment, contrast, and logo balance.'
  },
  {
    id: '3d-hotel-letter-h',
    sequence: 5,
    title: '3D Hotel – Letter H Concept',
    kind: 'Project',
    year: 2025,
    tags: ['Blender', '3D Modeling', 'Lighting'],
    image: 'assets/images/3d-hotel-letter-h-1.jpg',
    summary: 'A 3D hotel inspired by the shape of the letter H, modeled in Blender with interiors, lighting and materials.',
    process: 'Objective: Design a 3D hotel inspired by the shape of the letter H, using Blender to model interiors, lighting, materials, and render scenes that express the theme clearly. Research: Explored how letters can transform into architectural forms and how interior elements communicate function. Ideation: Sketched layouts based on the H shape and planned different rooms (reception, bedrooms). Modeling: Built all furniture and architectural elements from scratch using Blender tools and modifiers. Lighting: Tested daylight and night lighting to enhance mood and realism. Final execution: Rendered multiple scenes showing the hotel’s spaces, materials, and atmosphere.',
    learning: 'This project strengthened my skills in 3D modeling, lighting, and materials. I learned how to translate a simple letter shape into a functional architectural concept and how lighting dramatically affects the scene’s mood. Feedback helped me refine proportions, add detail, and improve render quality.'
  },
  {
    id: 'tarout-palm-island',
    sequence: 6,
    title: 'Tarout Palm Island',
    kind: 'Project',
    year: 2025,
    tags: ['Blender', '3D Modeling', 'World building'],
    image: 'assets/images/tarout-palm-island-1.jpg',
    summary: 'A stylized 3D island inspired by Tarout Island: a palm-tree maze in Blender leading visitors to Tarout Castle.',
    process: 'Objective: Create a stylized 3D island inspired by Tarout Island, designed as an exploratory palm-tree maze leading visitors toward the final landmark: Tarout Castle. Along the path, users discover four cultural mini-projects: Almond Tree, Saudi Coffee, Honey, and Taif Rose Perfume. Research: Collected references of Tarout Island, palm environments, traditional architecture, and Saudi cultural elements. Ideation: Developed sketches showing the island layout, maze structure, and station placement. Modeling: Built all assets in Blender, including palm trees, huts, castle elements, boats, trees, and cultural objects. Materials: Applied stylized pixel materials using color ramps, UV mapping, and extrusion techniques. Lighting: Used warm lighting to enhance atmosphere and guide visual exploration. Final execution: Rendered scenes from multiple angles showing the full island, maze flow, stations, and castle.',
    learning: 'This project strengthened my skills in world-building, stylized modeling, and creating interactive environments in Blender. I learned how to communicate cultural identity through 3D design.'
  }
];

/* Filter chips shown above the list. "All" is added by the script. */
var PROJECT_FILTERS = ['Blender', 'Photoshop', 'InDesign'];

/* Sort options for the <select>. `compare` receives two projects. */
var PROJECT_SORTS = [
  { id: 'course', label: 'Journal order', compare: function (a, b) { return a.sequence - b.sequence; } },
  { id: 'title-asc', label: 'Title A–Z', compare: function (a, b) { return a.title.localeCompare(b.title); } },
  { id: 'title-desc', label: 'Title Z–A', compare: function (a, b) { return b.title.localeCompare(a.title); } },
  {
    id: 'kind',
    label: 'Projects first',
    compare: function (a, b) {
      if (a.kind !== b.kind) {
        return a.kind === 'Project' ? -1 : 1;
      }
      return a.sequence - b.sequence;
    }
  }
];

/* In-class exercises from the journal, in order. */
var EXERCISES = [
  {
    title: '1.1 Mood Board Design',
    tools: ['Photoshop'],
    objective: 'Develop skills in text masking, photomontage and creative visual storytelling.',
    brief: 'The exercise was to use Photoshop to turn simple photos into imaginative visuals by creating a galaxy text for the word INFINITY and a playful scene where balloons lift the Burger King building. First I used a galaxy image as a clipping mask inside the text so the letters looked like deep space. Then I built a second scene by adding balloons and a zipper on top of the building and placing them in the empty sky area to push the level of creativity.',
    learning: 'This activity improved my control of layers, masks, selection and transformation tools in Photoshop. I learned to think beyond realistic scenes and to use digital tools to express abstract ideas in a clear and engaging way.',
    images: ['assets/images/exercise-1-1-1.jpg', 'assets/images/exercise-1-1-2.jpg']
  },
  {
    title: '1.2 Post Card',
    tools: ['Illustrator'],
    objective: 'Develop skills in visual branding, layout and creative concept building using Illustrator as a tool.',
    brief: 'In this exercise I designed a postcard using Illustrator. My idea targeted a seafood restaurant in Alkhobar, so I combined the word fish in Arabic (سمك) with the city name Alkhobar (الخبر) to create the brand name Samakji. I used a blue theme to express the sea and support the identity of a coastal restaurant. I started by experimenting with suitable typography for the new brand name, then arranged visual elements such as the octopus, waves and fish to create a strong marine atmosphere. I added simple outlined frames around the text to make the layout clear and balanced, and I organized the composition by distributing shapes and empty space to achieve a clean and appealing visual result.',
    learning: 'I learned how to build a visual identity from a simple linguistic idea and how to use color and marine elements to represent the concept of a seafood brand. I improved my skills in Illustrator, especially in layering, color control and creating a complete coherent design that clearly delivers the message.',
    images: ['assets/images/exercise-1-2-1.jpg', 'assets/images/exercise-1-2-2.jpg', 'assets/images/exercise-1-2-3.jpg']
  },
  {
    title: '1.3 Illustrator Logo',
    tools: ['Illustrator'],
    objective: 'Develop skills in constructing new logos using limited shapes and controlled design systems.',
    brief: 'In this exercise I used Illustrator to redesign a company logo by creating a new mark using only the shapes and visual language found in the original logo. The challenge was to build a fresh identity while staying fully restricted to the same geometric style and overall structure. I began by analyzing the original logo to understand its shapes, proportions and angles, then I recreated the basic forms in Illustrator and experimented with new arrangements to produce a different layout while keeping the same visual system. I adjusted stroke weight, alignment and rotation to achieve a balanced and strong design that still feels connected to the first logo.',
    learning: 'This exercise helped me understand how limitation can push creativity and how brand identity can be rebuilt through consistent geometry. I improved my ability to design within strict rules and to make clear, thoughtful design decisions using Illustrator tools and precise shape manipulation.',
    images: ['assets/images/exercise-1-3-1.jpg', 'assets/images/exercise-1-3-2.jpg', 'assets/images/exercise-1-3-3.jpg', 'assets/images/exercise-1-3-4.jpg']
  },
  {
    title: '1.10 Blender Modifiers',
    tools: ['Blender'],
    objective: 'Learn how to use modifiers to create smoother and more detailed 3D objects.',
    brief: 'I learned how to model a Saudi coffee dallah using modifiers like Subdivision Surface to smooth the shape and define its details. I also created maamoul, cups, and a serving tray to complete the scene, then added an HDRI background to place the set in a realistic environment. I modeled each part separately in Edit Mode, applied modifiers for smoothness, and arranged the objects together. After that, I set up the lighting and HDRI to prepare the final scene.',
    learning: 'I understand how modifiers enhance modeling and how combining multiple objects creates a complete 3D composition. This helped me gain more control and confidence in shaping complex models.',
    images: ['assets/images/exercise-1-10-1.jpg', 'assets/images/exercise-1-10-2.jpg']
  },
  {
    title: '1.13 Blender Nodes',
    tools: ['Blender'],
    objective: 'Learn how to build different textures for materials using shader nodes.',
    brief: 'In this exercise I created several spheres and gave each one a unique material using nodes. I experimented with patterns, metal, glass and plastic to see how textures change the look of the surface. I opened the shader editor and added texture nodes such as noise, checker and wave, then connected them to color and roughness to control the effect. I adjusted values until each sphere showed a clear and different texture.',
    learning: 'I learned how shader nodes control textures and how small changes in the node values create very different materials. This helped me understand how to design custom surfaces for future projects.',
    images: ['assets/images/exercise-1-13-1.jpg', 'assets/images/exercise-1-13-2.jpg']
  },
  {
    title: '1.14 Sculpting',
    tools: ['Blender'],
    objective: 'Learn basic sculpting tools and use them to create a stylized face.',
    brief: 'In this exercise I used sculpting mode to shape a head and practice building eyes, nose, mouth and ears for a simple character. I started from a basic mesh, then used grab, inflate and smooth brushes to form the main head shape and facial features and adjusted the lights to show the forms clearly.',
    learning: 'I learned how sculpting tools control volume and details and how I can push and smooth the mesh to create expressive faces.',
    images: ['assets/images/exercise-1-14-1.jpg']
  }
];
