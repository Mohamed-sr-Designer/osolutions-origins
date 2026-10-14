/* ============================================================
   LIBRARY: a question flow that recommends free video courses.
   No password. Built from every course on the site plus extra videos.
   ============================================================ */
const LIB_KEY = 'osol-library-v1';
const LIB_TOPICS = [
  { id: 'video', name: 'Video & Filmmaking' },
  { id: 'editing', name: 'Video Editing' },
  { id: 'motion', name: 'Motion & VFX' },
  { id: 'direction', name: 'Art & Creative Direction' },
  { id: 'ui', name: 'UI/UX' },
  { id: '3d', name: '3D' },
  { id: 'design', name: 'Graphic Design' },
  { id: 'brand', name: 'Branding' },
  { id: 'ai', name: 'AI' }
];
const LIB_LEVELS = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };
const LIB_GOALS = [
  { id: 'job', name: 'Get my first job', topics: [], pin: ['s2-01', 'm-11'] },
  { id: 'freelance', name: 'Work with clients as a freelancer', topics: ['brand', 'direction'], pin: [] },
  { id: 'levelup', name: 'Level up at my current job', topics: [], pin: [] },
  { id: 'lead', name: 'Lead a team or become a creative lead', topics: ['direction'], pin: ['d-06', 's2-08'] },
  { id: 'own', name: 'Make my own projects', topics: [], pin: [] }
];
const LIB_TIME = [
  { id: 'light', name: 'About 2 hours a week', h: 2, sub: 'A little each week' },
  { id: 'normal', name: 'About 5 hours a week', h: 5, sub: 'A steady habit' },
  { id: 'heavy', name: '8 hours or more a week', h: 8, sub: 'Serious focus' }
];
const LIB_TOPIC_SUB = {
  video: 'Shooting, framing, lighting, filmmaking basics', editing: 'Cutting, pacing, colour, sound, Premiere and DaVinci',
  motion: 'After Effects, animation, VFX, showreels', direction: 'Art direction, concepts, creative leadership',
  ui: 'Apps, websites, Figma, user research', '3d': 'Blender, Cinema 4D, lighting and rendering',
  design: 'Layout, typography, composition, Photoshop, Illustrator', brand: 'Logos, identity systems, brand guidelines', ai: 'AI tools for images, video and workflow'
};
const LIB_LEVEL_SUB = { 1: 'I know little or nothing yet', 2: 'I can do the basics on my own', 3: 'I am comfortable and want to go deeper' };
const LIB_GOAL_SUB = {
  job: 'A strong portfolio and showreel', freelance: 'Branding, direction, working with clients', levelup: 'Sharper skills in what you already do',
  lead: 'Direction, feedback and managing creative work', own: 'Personal films, apps, art and experiments'
};
const LIB_TOPIC_OF = {
  video: ['m-05', 'kin-05', 'lad-11', 'core-07'],
  editing: ['lad-01', 'lad-12', 'lad-02', 'lad-13', 'lad-07', 'lad-08', 'bon-montage', 'm-03', 'm-07', 'm-09', 's2-04', 'm-08'],
  motion: ['lad-03', 'lad-04', 'm-01', 'm-02', 'm-06', 's2-02', 'd-01', 's2-09', 'tl-12', 'tl-13', 'm-11'],
  direction: ['des-07', 'des-08', 'frg-01', 'ang-01', 'des-11', 's2-08', 'd-06', 'core-08', 'core-09'],
  ui: ['bon-uiux', 'u-01', 'u-02', 'u-03'],
  '3d': ['lad-05', 'lad-06', 'lad-09', 'm-04', 'm-10', 'tl-01', 'tl-03', 'tl-04', 'tl-05', 'tl-07', 'tl-08', 'tl-09', 'tl-10', 's2-03', 'bon-blender'],
  design: ['core-04', 'core-06', 'core-05', 'd-03', 'des-01', 'des-02', 'des-03', 'd-02', 'd-04', 's2-06', 'd-05', 'frg-03', 'frg-05', 'frg-07', 's2-01'],
  brand: ['des-04', 'des-05', 'des-06', 's2-05', 's2-07'],
  ai: ['core-01', 'core-02', 'core-03', 'tl-02', 'des-09', 'des-10', 'lad-10', 'tl-06', 'tl-11', 'tl-14', 'kin-04', 'kin-09']
};
const LIB_LEVEL_OVERRIDE = { 'lad-05': 1, 'lad-03': 1, 'lad-01': 1, 'core-07': 1, 'tl-02': 1, 'core-01': 1, 'core-02': 1, 'core-03': 2, 'des-09': 2, 'm-05': 1, 'kin-05': 1 };
const LIB_EXTRA = [{"id":"9AGaECt9j4g","title":"Film Blocking Tutorial — Filmmaking Techniques for Directors: Ep3","by":"StudioBinder","topic":"video","level":1},{"id":"h00dz3nLXYY","title":"Master the Art of Scene Blocking with These Director Tips","by":"jimcostafilms","topic":"video","level":1},{"id":"Ijr1bpY9NFw","title":"How to Make a Shot List | Filmmaking for Beginners","by":"The Nerdy Filmmaker","topic":"video","level":1},{"id":"TwHhDD3n_BM","title":"Directing and Blocking | Joan Scheckel workshops | Film Independent","by":"Film Independent","topic":"video","level":1},{"id":"TAX-EE9dkEk","title":"WHAT IS BLOCKING AND STAGING IN FILM?","by":"BBP Reel Insights","topic":"video","level":1},{"id":"oGmqtvbbyhc","title":"How to Block a Scene | What Blocking Means | Directing Your Actors - Film Education","by":"Kendra Joy","topic":"video","level":1},{"id":"-EUexjlStHg","title":"The best first project for beginner filmmakers...","by":"Matt Aitia","topic":"video","level":1},{"id":"eL_XaKA5qWM","title":"Why Great Directors Lock the Camera","by":"StudioBinder","topic":"video","level":1},{"id":"IwQFb3H6RS0","title":"WHAT IS SHOT BLOCKING IN FILM?","by":"BBP Reel Insights","topic":"video","level":1},{"id":"OMd7pQM7HLU","title":"Film Blocking Masterclass: Elevate Your Visual Storytelling","by":"Breadfruit Studios","topic":"video","level":2},{"id":"7FNQ_1SYAv8","title":"What is an art director on a film set?","by":"PaulMcGhie","topic":"direction","level":1},{"id":"xw6MaR73mHI","title":"The Impact of Art Direction in Film","by":"Alex Killian","topic":"direction","level":1},{"id":"FP5EOLF7GPI","title":"The Art Director Job Description","by":"Open Door Creative","topic":"direction","level":1},{"id":"AVJOLDacdQQ","title":"How to Become an Art Director","by":"Western Governors University","topic":"direction","level":1},{"id":"qSDVfvoOyZY","title":"The 4 Key Steps to Art Direction | Marcus Brown Design","by":"awwwards.","topic":"direction","level":1},{"id":"UNlwaYa9dZw","title":"Job description of Art Director - Role, Responsibilities & Skills","by":"Irritating Facts","topic":"direction","level":1},{"id":"Ck0-TuQPxBw","title":"9 Years of Art Direction in 15 Minutes","by":"orenmeetsworld","topic":"direction","level":2},{"id":"yqCoK_bLQGM","title":"How to Become an Art Director: Ideas, Visual Skills, and a Spec Portfolio","by":"Teachable","topic":"direction","level":2},{"id":"lFToIvzG0os","title":"Visual Hierarchy Explained | UI Design Principles for Beginners","by":"VirtualAddiction","topic":"ui","level":1},{"id":"-O1ds-kPUZg","title":"The Easy Way to Pick Perfect Spacing","by":"Sajid","topic":"ui","level":1},{"id":"DBHBmeNhYrY","title":"What Is Visual Hierarchy?","by":"Envato","topic":"ui","level":1},{"id":"cf95Z7Ngg8k","title":"Master Spacing in UI Design 💪","by":"Jesse Showalter","topic":"ui","level":1},{"id":"In6IWl60Y4U","title":"5 ingredients to master Visual Hierarchy | Visual Design | Visual Hierarchy in UI/UX Design","by":"ProApp Learn Design","topic":"ui","level":1},{"id":"uwNClNmekGU","title":"4 Foundational UI Design Principles | C.R.A.P.","by":"Jesse Showalter","topic":"ui","level":1},{"id":"mbj6hx4itkM","title":"Mobile UI Design Principles and Best Practices: Tappability Affordances","by":"IxDF - Interaction Design Foundation","topic":"ui","level":1},{"id":"Gfsd8NNuD9g","title":"Everything you need to know about Mobile App UI’s in 8 minutes (beginner friendly)","by":"Kole Jain","topic":"ui","level":1},{"id":"YUMdv4yFlQU","title":"Visual Design Principles in Action","by":"NNgroup","topic":"ui","level":1},{"id":"D4NyQ5iOMF0","title":"Figma UX tutorial for beginners - Wireframe","by":"Aliena Cai","topic":"ui","level":1},{"id":"c9Wg6Cb_YlU","title":"UI / UX Design Tutorial – Wireframe, Mockup & Design in Figma","by":"freeCodeCamp.org","topic":"ui","level":1},{"id":"D1pO4AQTfes","title":"UI Design Live: UI Patterns, Visual Hierarchy and Iterations","by":"DesignCode","topic":"ui","level":2},{"id":"BT1twU_rDSM","title":"How to Create a UX Design Case Study | Presentation Deck & Visuals for your UX Portfolio","by":"Charli Cheung","topic":"ui","level":2},{"id":"ZzOoPvHkwyI","title":"How to Create a UI/UX Case Study in Figma (2026) to Land a Job","by":"Seddyworld Digital ","topic":"ui","level":2},{"id":"JcSZ2e5cZOA","title":"Level up your UX case studies in under 12 minutes! free Figma mockups template","by":"erinkate","topic":"ui","level":2},{"id":"W7R0b4DReqc","title":"UX Case Study Walkthrough","by":"Sara Brunettini","topic":"ui","level":2},{"id":"bKQ8WUxteBs","title":"Figma Prototyping Tutorial: How to Design & Animate a Fintech App (Step-by-Step)","by":"Design with Kingsley","topic":"ui","level":2},{"id":"nUQmCgFubeY","title":"UI Design a Portfolio site in Figma - full course","by":"DesignCode","topic":"ui","level":2},{"id":"q7ICZWUBE7w","title":"Make Your Logo ANIMATE in After Effects!","by":"7 Minute AE Tutorials","topic":"motion","level":1},{"id":"jxzaBuBtIpo","title":"How To Animate Any Logo in After Effects(Tutorial)","by":"Logo animation service","topic":"motion","level":1},{"id":"pJLZU7ffXDA","title":"Motion Graphics Tutorial | Pro Logo Animation in After Effects","by":"Jafar Fazel","topic":"motion","level":1},{"id":"M2S-6ptUvus","title":"10 Pro Ways To Animate Your Logo in After Effects","by":"SonduckFilm","topic":"motion","level":1},{"id":"ZP_TUrLN9uE","title":"Stylized Logo Animation After Effects CC Tutorial","by":"SSB Otaru","topic":"motion","level":2},{"id":"rEYXgyuWy4s","title":"Custom Logo Animation in After Effects | Nature Leaf Animation | After Effects Tutorial","by":"sheikh sohel","topic":"motion","level":2},{"id":"bj-UW0AM384","title":"Morph Any Logo & Objects into Other Objects in After Effects","by":"DuckTUT","topic":"motion","level":2},{"id":"5KbRVVJqGdc","title":"3 Seamless Cinematic Transitions for Your Premiere Pro Edits","by":"MJ Editings","topic":"editing","level":2},{"id":"wzWxA7wYdhI","title":"Cinematic TRANSITIONS for Premiere Pro","by":"Media Magnet","topic":"editing","level":2},{"id":"O4E6JUySCt0","title":"TUTORIAL - Cinematic Transitions and Effects in Premiere Pro","by":"DaniMult","topic":"editing","level":2},{"id":"-a3e2ga6RRw","title":"Cinematic FLASH Transition | Premiere Pro Tutorial","by":"Adobe Made Simple","topic":"editing","level":2},{"id":"y9OQH9wI5jE","title":"3 BEST TRANSITIONS you NEED to know! | Cinematic Transitions in Premiere Pro (Tutorial)","by":"Mohnish Doultani","topic":"editing","level":2},{"id":"UAOc35-QrKw","title":"TOP 3 TRANSITIONS in Premiere Pro | Best Easy Transitions","by":"Smertimba Graphics","topic":"editing","level":2},{"id":"wBMkrDK51b0","title":"This Premiere Transition Makes Edits Look Cinematic (No Plugin)","by":"Media Magnet","topic":"editing","level":2},{"id":"pwjJhb54Wxw","title":"90 New FREE Effects and Transitions in Premiere Pro! (Video Editing Tutorial)","by":"Peter Sarellas","topic":"editing","level":2},{"id":"mgg066fvUqc","title":"HDRI Lighting Fundamentals in Blender","by":"Blender Tutor","topic":"3d","level":1},{"id":"FIbuGjN0rzI","title":"Blender how to use HDRI in render","by":"blenderian","topic":"3d","level":1},{"id":"Im9Q-_hjv48","title":"How to use HDRI in Blender (Best way)","by":"BadgerBricks","topic":"3d","level":1},{"id":"r5z_9g3LxIk","title":"HDRI lighting in Blender - Setup an interior scene like Keyshot","by":"Mabel Design","topic":"3d","level":1},{"id":"wZ6_fmDGWHs","title":"Blender Realistic Render with Environment Map Texture using HDRI lighting image","by":"blenderian","topic":"3d","level":1},{"id":"dbAWTNCJVEs","title":"Using HDRIs in Blender 2.8 - Instant Realistic Lighting","by":"FlippedNormals","topic":"3d","level":1},{"id":"gDKrDelckX0","title":"1 Click = 100% Realistic Lighting! | Blender Essentials 02 | Blender 3D Beginners Tutorial","by":"ArtSyndrom3","topic":"3d","level":1},{"id":"cvVm4ou7ByE","title":"How to add HDRi in Blender 4.1! (Quick realistic Lighting)","by":"Blender Inferno","topic":"3d","level":1},{"id":"PKXIujVcAj0","title":"How to do HDR lighting in Blender/Cycles in 15 seconds","by":"Greg Zaal","topic":"3d","level":1},{"id":"fB1yye1aAmY","title":"Render with Jay #02: Lighting and HDRI Setup in Blender","by":"The WP Guru","topic":"3d","level":1},{"id":"_r1EPF-h4FE","title":"Kinetic Typography Made Easy in After Effects - Beginner to Pro Guide","by":"Ag Motion Designs","topic":"motion","level":1},{"id":"suO_UMqIgH4","title":"Kinetic Typography in Adobe After Effects – Beginner to Pro Guide","by":"Ag Motion Designs","topic":"motion","level":1},{"id":"MLQAXJXVvgI","title":"Kinetic Typography Animation in After Effects – No Plugins Needed | After Effects Tutorial","by":"sheikh sohel","topic":"motion","level":1},{"id":"_6-l8VfY_yk","title":"SUPER QUICK Kinetic Typography in After Effects | Adobe Tutorial","by":"7 Minute AE Tutorials","topic":"motion","level":1},{"id":"6bBQvUyW3EE","title":"Kinetic Typography In After Effects - No Plugins","by":"Michael Tierney","topic":"motion","level":1},{"id":"hm16tL3EWPM","title":"Master Kinetic Typography in Adobe After Effects | Motion Graphics Tutorial","by":"Ag Motion Designs","topic":"motion","level":1},{"id":"HevSiSwSb6w","title":"Tutorial: After Effects Green Screen & Motion Track","by":"SantosSays","topic":"motion","level":1},{"id":"AdZUrGqbD1E","title":"How to Track Green Screen Elements in After effects","by":"Motion Creative Media","topic":"motion","level":1},{"id":"Wy6VDGFwHaA","title":"Getting Started with Motion Tracking & Green Screens with Adobe After Effects","by":"Weisbrod Imaging","topic":"motion","level":1},{"id":"l2776Rllu18","title":"Learn VFX for Beginners - After Effects Tutorial","by":"Motion Designer","topic":"motion","level":1},{"id":"SFgWa5G0VAE","title":"After Effects Expressions 101 - Expressions Overview","by":"Animoplex","topic":"motion","level":2},{"id":"j2j6tT2riZw","title":"Course: Animating with Expressions in After Effects","by":"Manuel does Motion","topic":"motion","level":2},{"id":"6UFH8pD824Q","title":"Motion Graphics: Animate a Character in After Effects (intermediate) | Freepik Course Trailer_ENG","by":"Magnific","topic":"motion","level":2},{"id":"F_BmqyF7BJI","title":"The Basics of Character Animation (Rigging & Puppet Pin) | After Effects Tutorial","by":"SonduckFilm","topic":"motion","level":2},{"id":"MXrQROmttqA","title":"How to rig and animate characters in After Effects!","by":"Envato Video","topic":"motion","level":2},{"id":"6t6n1YehQIM","title":"How To Rig A Character In After Effects Beginner Tutorial + Free Rig Download!","by":"Greg Gunn","topic":"motion","level":2},{"id":"V6TmOWFVoO0","title":"Creative Kinetic Typography 02 | After Effects Tutorial","by":"Georgie Yana","topic":"motion","level":2},{"id":"LZrCSU4TEG0","title":"Green Screen Tracking Compositing Using After Effects","by":"4RAYS TECH","topic":"motion","level":2},{"id":"PUO_yUJH4h4","title":"After Effects Series Motion Tracking, Green Screen compositing PART 1: The Introduction","by":"chinfat","topic":"motion","level":2},{"id":"6-Kf4z9Esy4","title":"After Effects Green Screen VFX Tutorial | Motion Tracking | *ADVANCED TUTORIAL*","by":"Valley Video","topic":"motion","level":2},{"id":"NUHKLsFvlpU","title":"Compositing in Adobe After Effects (Tutorial)","by":"Noble Desktop","topic":"motion","level":2},{"id":"BXM46J1YsZI","title":"Motion Design Process in After Effects Illustrator & Photoshop - Tutorial","by":"Ben Marriott","topic":"motion","level":2},{"id":"2od39YJc4zc","title":"Preparing Any Characters For Rigging In After Effects","by":"Jafar Fazel","topic":"motion","level":3},{"id":"IJgAUkjsomA","title":"Character Rigging, EASY Character Animation Tutorial In After Effects, Illustrator And Duik Plugin","by":"Mark Rise","topic":"motion","level":3},{"id":"AIKjBuTde9M","title":"Character Rigging & Animation in After Effects – Part 01 (Beginner to Pro)","by":"Move Shapes","topic":"motion","level":3},{"id":"Fianj3C4vTo","title":"Full Character Rigging in After Effects Tutorial using DUIK BASSEL 2022","by":"Move Shapes","topic":"motion","level":3},{"id":"qzFsGD1AkHg","title":"After Effects - Character Rig Part 1 | Tutorial on rigging a character - Backwoods Animation","by":"Backwoods Animation Studio","topic":"motion","level":3},{"id":"O1O64Y39rFI","title":"Keying and Tracking in After Effects: Part 1","by":"School of Motion","topic":"motion","level":3},{"id":"UxFAuEpuFdI","title":"Premiere Pro for Beginners: Edit Like a Pro in 30 Minutes!","by":"Maxwell Ridgeway","topic":"editing","level":1},{"id":"B1zN57h5LnI","title":"Adobe Premiere Pro FREE Course for Beginners – Episode 1 | Learn Video Editing & Make Money Online","by":" charan things","topic":"editing","level":1},{"id":"gDbWqUdwrSo","title":"Master Adobe Premiere Pro 2021 in Just 45 Minutes - Beginners Tutorial","by":"DCP Web Designers","topic":"editing","level":1},{"id":"YbDRl_xugJo","title":"NEW to DaVinci Resolve? Color Grading - Tutorial","by":"Darren Mostyn","topic":"editing","level":1},{"id":"N0gKlABi1cs","title":"Make Your Videos Sound Professional with These Mixing Basics","by":"Jonny Duncan","topic":"editing","level":1},{"id":"X3SmsG8JdrU","title":"How to Mix Audio for Video","by":"Epidemic Sound","topic":"editing","level":1},{"id":"w-o92faeqH4","title":"EVERY EDITOR NEEDS TO HEAR THIS | Sound Design Tutorial - For Beginners","by":"nuka nuka.","topic":"editing","level":1},{"id":"8HrWZ4eiXcc","title":"How To Mix Audio For YouTube In Premiere (2021)","by":"Doctor Mix","topic":"editing","level":1},{"id":"m2B6pZBolLA","title":"Understanding AUDIO Editing for YouTube Videos - You Will be embarrassed you didn't know","by":"Sean Kitching","topic":"editing","level":1},{"id":"IG683SXcal4","title":"Video Editing Pacing Tips","by":"Film Editing Pro","topic":"editing","level":1},{"id":"BsyQEj-Uqpc","title":"Premiere Pro Full Course 2026 for Beginners to Advance","by":"Lets Uncover","topic":"editing","level":2},{"id":"zS04fo7dPaM","title":"Master Color Management in DaVinci Resolve | Beginner to Advanced | YRGB, DaVinci Wide Gamut & ACES","by":"Color Grading Hunter","topic":"editing","level":2},{"id":"aTXrSagx7b4","title":"How Professional Video Editors Mix Dialogue and Music in Offline Edits","by":"Derek Lieu","topic":"editing","level":2},{"id":"Wcxw3BPSt3A","title":"How to SOUND DESIGN a Video | Step-By-Step Tutorial","by":"Film Editing Pro","topic":"editing","level":2},{"id":"yQK4bjoxO1w","title":"5 Easy Editing Tricks for More Powerful Storytelling","by":"Tim Runia","topic":"editing","level":2},{"id":"HOnMnjZWw4w","title":"Make Your Subject POP | Advanced Color Grading Davinci Resolve 17 Tutorial","by":"The Modern Filmmaker","topic":"editing","level":3},{"id":"sSTGzHzLsX4","title":"Advance Cinematic Color Grading Davinci Resolve 18 Tutorial","by":"Arunz Creation","topic":"editing","level":3},{"id":"N91YBOqKw0Q","title":"Tell Your Story With Advanced Color Grading | Davinci Resolve 15 Tutorial","by":"The Modern Filmmaker","topic":"editing","level":3},{"id":"zvwmgOeXd28","title":"DaVinci Resolve 17 Color Training - Advanced Color","by":"Blackmagic Design","topic":"editing","level":3},{"id":"Cp63WiK3VEA","title":"Cinematic Color Grading | Davinci Resolve 19 Tutorial | BMPCC 6K Pro","by":"Mediabee Color Lab","topic":"editing","level":3},{"id":"sUiUaPpIVPY","title":"Master Cinematic Color Grading in DaVinci Resolve — Achieve the Hollywood Film Look","by":"Hermanos Bander","topic":"editing","level":3},{"id":"HhSGQPba5u8","title":"Audio Post Sound Design: Punchy Sound Effects/Sound Design Tips for Editors","by":"Thomas Boykin","topic":"editing","level":3},{"id":"CdyTIng0M8Q","title":"Pacing in Film Editing: Techniques Every High-End Editor Must Know","by":"Inside The Edit","topic":"editing","level":3},{"id":"2BvIoOjyIHg","title":"9 Documentary Editing Techniques I Use on Every Project | Aidin Robbins","by":"Adorama Cinema","topic":"editing","level":3},{"id":"bCVeyUFGxi8","title":"Pacing in Film Editing: The Framework Pro Editors Use","by":"Inside The Edit","topic":"editing","level":3},{"id":"pRpaqx_5jD8","title":"How Pacing Controls Emotion in Editing","by":"Inside The Edit","topic":"editing","level":3},{"id":"0CEVwgxs5XY","title":"Lighting for Film: The Complete Beginner's Guide","by":"Luc Ung","topic":"video","level":1},{"id":"8rAe8RuICYM","title":"The Basics of Cinematography - Filmmaking for Beginners","by":"Camp Films","topic":"video","level":1},{"id":"vwz5b-12tG0","title":"Easy Cinematic Lighting Setup for Filmmaking ","by":"Axel Marshall","topic":"video","level":1},{"id":"OUPGs5y8TS0","title":"The Lighting Technique That Makes Anything Cinematic ","by":"Chris Ajtony","topic":"video","level":1},{"id":"2gB0DMTDbd8","title":"Ultimate CINEMATIC LIGHTING Setup Tutorial for Beginners","by":"Joris Hermans","topic":"video","level":1},{"id":"TFOpa_IZmrU","title":"CINEMATIC LIGHTING for BEGINNERS - Easy Steps to Light Any Scene","by":"Jacques Crafford","topic":"video","level":1},{"id":"ZNRQQi42CZA","title":"How to Make a Shot List in StudioBinder | Shot List Tutorials","by":"StudioBinder Academy","topic":"video","level":1},{"id":"6pGcgGihrjI","title":"Storyboard Planning Made Easy: The Shot List Section | Storyboarder.ai Tutorial","by":"Storyboarder AI","topic":"video","level":1},{"id":"zQjxrlAJmJI","title":"Cinematography Breakdown - Lighting & Camera Techniques for CINEMATIC VIDEO","by":"Jacques Crafford","topic":"video","level":2},{"id":"JiNU5yINMbI","title":"Master Cinematic Lighting and Framing with These 25 Tips | Dylan Batista","by":"Adorama Cinema","topic":"video","level":2},{"id":"r2nD_knsNrc","title":"Ultimate Guide to Cinematic Lighting — Types of Light & Gear Explained [Shot List Ep. 12]","by":"StudioBinder","topic":"video","level":2},{"id":"pGwIJMPLmH4","title":"Master HOW TO STORYBOARD These 5 ESSENTIAL Shots","by":"BEYOND THE PROCESS","topic":"video","level":2},{"id":"Ne-e7IjNUdE","title":"Storyboarding: How to storyboard a film","by":"Brett Lamb","topic":"video","level":2},{"id":"CvQRWPVUiP4","title":"The Ultimate Guide to Shot Lists for Filmmaking","by":"Camp Films","topic":"video","level":2},{"id":"oIzPT05pvY8","title":"The Art Direction Playbook for Brands (Stussy Case Study)","by":"orenmeetsworld","topic":"direction","level":3},{"id":"mhfVCsfW968","title":"The creative direction playbook for brands (Rhode case study)","by":"orenmeetsworld","topic":"direction","level":3},{"id":"N6M6W9T2weM","title":"Building brands with artistic vision (Gentle Monster case study and more)","by":"orenmeetsworld","topic":"direction","level":3},{"id":"PmC0QCErvr4","title":"How to Visually Upgrade Your Music Brand: Art Direction Playbook (Mau P Edition)","by":"Neighborhood Art Supply","topic":"direction","level":3},{"id":"GgucGGRHWi4","title":"How To Visually UPGRADE Your Music Brand: The Art Direction Playbook (Dom Dolla Edition)","by":"Neighborhood Art Supply","topic":"direction","level":3},{"id":"ZyAl3FgdK90","title":"Generative Fill AI + Adobe Firefly + ChatGPT for Changing Background in Portraits","by":"Creative Pad Media","topic":"ai","level":1},{"id":"9e8aOzwDPr4","title":"Photoshop Generative Fill AI Full Tutorial (Tips and Tricks)","by":"PromoAmbitions","topic":"ai","level":1},{"id":"rGsD3u1dzzI","title":"NEW AI in Photoshop. Generative Fill Tutorial.","by":"Sebastian Kamph","topic":"ai","level":1},{"id":"AgAsj4nlX1A","title":"Generative Photoshop Fill by Adobe Firefly (Quick & Easy Tutorial)","by":"Phil Pallen","topic":"ai","level":1},{"id":"ufjcc9cl-dU","title":"Photoshop Firefly - Generative Fill Tutorial using Ai","by":"David Bittorf","topic":"ai","level":1},{"id":"bpansSo_Ihc","title":"How to use Adobe Firefly’s Generative AI Magic","by":"Teacher's Tech","topic":"ai","level":1},{"id":"qQVDTX4qDbM","title":"Midjourney + Runway Gen 3 Turbo Full Course (Create Lifelike Cinematic AI Videos)","by":"CyberJungle","topic":"ai","level":2},{"id":"dEXq2Vuyr2M","title":"How to use RUNWAY Gen 3 to make Videos from MIDJOURNEY Ai Art!","by":"Wade McMaster - Creator Impact","topic":"ai","level":2},{"id":"WdgS9zudLzw","title":"Midjourney AI Masterclass - Workflow and Tips from Real Designers","by":"The Crazy One by Stephen Gates","topic":"ai","level":2},{"id":"anNZd8WbeGs","title":"How to Create an AI Cinematic Story: Full Workflow | Runway Gen-3 | Midjourney | Adobe","by":"Hidden Space","topic":"ai","level":2},{"id":"Jg4Q_TAJ28M","title":"Runway ML Workflow Tutorial: Consistent AI Photos & Videos","by":"Cole Bielecki","topic":"ai","level":2},{"id":"e3nI75J2Q4s","title":"MidJourney & Runway Gen 3 Turbo Full Tutorial (Animate Cinematic Ai Films)","by":"TheBigWave","topic":"ai","level":2},{"id":"rUfo6RXf1dE","title":"All About the NEW Generative Model in Photoshop","by":"Anthony Morganti","topic":"ai","level":2},{"id":"dvnRNHL7aR4","title":"How I Create High-End AI Videos in 2026 (Midjourney → Kling → Runway)","by":"GENERATIVE ART STUDIO","topic":"ai","level":3},{"id":"V4FSSMv-SYg","title":"Adobe Photoshop + Firefly - Using Generative AI to Enhance Your 3D Workflow","by":"Michael Tanzillo","topic":"ai","level":3},{"id":"WobATxh3i-g","title":"The Basics of Lighting and Rendering in Blender (Donut Finale)","by":"Blender Guru","topic":"3d","level":1},{"id":"LuNiMbJEreo","title":"Let's Learn Blender! #10: Lights, Shadows, & Rendering in EEVEE!","by":"BornCG","topic":"3d","level":1},{"id":"Qw8jl8mKEsY","title":"How to Render a Scene with Lights in Blender","by":"What Make Art","topic":"3d","level":1},{"id":"Hac6E-iRLn8","title":"CINEMA 4D : Introduction to the Beginner Tutorial Series","by":"GELEVEN","topic":"3d","level":1},{"id":"ErwbkuMQi3k","title":"How To Learn Cinema 4D / Ultimate Beginners Guide to Resources & Tutorials","by":"Matt Kander","topic":"3d","level":1},{"id":"lZo8rFPOQ14","title":"Cinema 4D - Create Your First Animation ( Beginner)","by":"Fattu Tutorials","topic":"3d","level":1},{"id":"fO0EHQfNGRc","title":"Cinema 4D Tutorial - Ultra Beginner Animation Tutorial","by":"Fattu Tutorials","topic":"3d","level":1},{"id":"gqJEgDwFi9g","title":"The Ultimate Beginners Guide To Cinema 4D in 2025","by":"CG Shortcuts","topic":"3d","level":1},{"id":"MIaoonh8NrQ","title":"Cinema 4D Tutorial Beginner | C4D Tutorial Beginner | Cinema 4D Glossy Material","by":"Fattu Tutorials","topic":"3d","level":1},{"id":"mgHsZZiyd54","title":"Sculpting a Cute Character in Blender for Complete Beginners","by":"Ryan King Art","topic":"3d","level":1},{"id":"VYuUlQO-kYE","title":"Sculpting with Blender For Beginners (Tutorial)","by":"Ryan King Art","topic":"3d","level":1},{"id":"MpeXkcp3YLo","title":"Easy Beginner Sculpting Tutorial - Stylized Character Face (Blender)","by":"Ryan King Art","topic":"3d","level":1},{"id":"ENnEYoUpFfU","title":"Fundamentals of Lighting in Blender","by":"Blender Guru","topic":"3d","level":2},{"id":"y6WKm62mhIo","title":"Modern Lighting Techniques in Blender","by":"Ducky 3D","topic":"3d","level":2},{"id":"RjikjNCa7qk","title":"Shading Modes in Blender: The Ultimate Visual Breakdown for Stunning 3D Renders","by":"MA 3D Universe","topic":"3d","level":2},{"id":"sw_2Pvrwimg","title":"Blender Character Sculpting Tutorial - For Beginners - Part 2","by":"Blender Art","topic":"3d","level":2},{"id":"lkP-xHYEXrI","title":"Blender Tutorial for Beginners - Creature Sculpting Part 1","by":"in2vert","topic":"3d","level":2},{"id":"D-Ddbbr_3vI","title":"3D Character Modeling in Blender | Part 1: Sculpt a Realistic Face from Scratch","by":"Him 3D Studio","topic":"3d","level":2},{"id":"xOUQUDoflxU","title":"Product Visualization in Blender🎙️Part 1 (Tutorial)","by":"Ryan King Art","topic":"3d","level":2},{"id":"e6ve9JTvmcA","title":"Product Animation under 13 min Blender. texturing, lighting. Product visualization | full tutorial.","by":"Blender To Browser","topic":"3d","level":2},{"id":"MZWvxoWaPxY","title":"Product Visualization with Blender - Pt 5 - Animating the product","by":"Jouleconcepts","topic":"3d","level":2},{"id":"kPBY7vEjSCg","title":"Blender Product Design Tutorial: Part 3, Animation and Rendering","by":"Nick Impson","topic":"3d","level":2},{"id":"l1TH8kvZiow","title":"Blender Tutorial: Make Your First 3D Product Animation - Modeling | Part 1","by":"Sost cgTeCH","topic":"3d","level":2},{"id":"99IP_NiF7RM","title":"Light-Based Shaders - an NPR Trick - Blender Tutorial","by":"Deayan Studios","topic":"3d","level":3},{"id":"3K9JX6Mur6U","title":"Blender Tutorial: Perfect Anime Lighting and Shading Techniques | CGDASH","by":"CG DASH","topic":"3d","level":3},{"id":"z4PKYW6DnKw","title":"Full 3.5 Hour Product Animation Masterclass [Blender 4.3]","by":"The Blenderender","topic":"3d","level":3},{"id":"WSVcuAs-vh4","title":"How to Create Realistict Photo Product Visualization |Blender Tutorial","by":"RideBlenderl3d studio","topic":"3d","level":3},{"id":"lZPedlX6CMw","title":"Product Animation in Blender: Phone","by":"Derek Elliott","topic":"3d","level":3},{"id":"EYUL0N1Fjhg","title":"Easy Usability testing guide with example (Remote & in person) UX User research","by":"UX Tshili","topic":"ui","level":1},{"id":"dFlACTzeq0w","title":"UX Design Tutorial: Introduction to UX Research Process and Methods","by":"Ari Pxl","topic":"ui","level":1},{"id":"jn6nT5JVmoc","title":"The easy and effective way to run a usability test","by":"Samuel Fabayo","topic":"ui","level":1},{"id":"PiyrpfCD2-E","title":"Usability Testing 101! Learn the Basics","by":"UXtweak","topic":"ui","level":1},{"id":"Nif_C4mwXw4","title":"Figma Tutorial for Beginners: Mobile App UI/UX Design & Interactive Prototype","by":"Design With Elwakil","topic":"ui","level":1},{"id":"oMoH6KGQ60M","title":"Figma Mobile App Design Tutorial | Fintech App | UI/UX Design Tutorial for Beginners & Intermediates","by":"David Emulo","topic":"ui","level":1},{"id":"3qLX9IaGZO0","title":"Figma UI Design Tutorial for Beginners - Complete Guide","by":"UIX Design Academy","topic":"ui","level":1},{"id":"zHQeeb_B8HQ","title":"Mobile App Design in Figma - Figma Tutorial for Beginners","by":"UIX Design Academy","topic":"ui","level":1},{"id":"OHnPkW_JSMM","title":"Free Figma Tutorial for Beginners: Simple App UI Design from Scratch (Part 1)","by":"Gytis Mark","topic":"ui","level":1},{"id":"jwCmIBJ8Jtc","title":"Figma Tutorial for UI Design - Course for Beginners","by":"freeCodeCamp.org","topic":"ui","level":1},{"id":"H5EdlGBEjGE","title":"Learn Figma UI/UX Design | Beginners Tutorial","by":"UIX Design Academy","topic":"ui","level":1},{"id":"G0hVXwa0SJo","title":"Figma UI Design Tutorial | How to Design Mobile App UI (Step by Step)","by":"GDMentor","topic":"ui","level":1},{"id":"EFibAyIO_XI","title":"UX Portfolio: Dos and Don'ts for Your First UX Case Studies","by":"vaexperience","topic":"ui","level":1},{"id":"3XIQZrrhx-I","title":"Figma for Edu: Learning Auto Layout workshop","by":"Figma","topic":"ui","level":2},{"id":"APyurkBpKmc","title":"Learn Figma Responsive Auto Layout in 35 Minutes | Auto Layout 2026","by":"David Emulo","topic":"ui","level":2},{"id":"8lR_fOh4KXY","title":"How to Use Auto Layout in Figma Full Guide 2026","by":"How To Fix Pro","topic":"ui","level":2},{"id":"rgbnAsmPaZk","title":"Figma Tutorial: Master Auto Layout in 30 Minutes | Auto Layout (+ Practice File)","by":"DesignWithArash","topic":"ui","level":2},{"id":"E__UQ2QD-6o","title":"UX Researcher: User Research & Usability Testing Guide","by":"CodeLucky","topic":"ui","level":2},{"id":"nYCJTea1AUQ","title":"Usability Testing Tips and Examples | Google UX Design Certificate","by":"Grow with Google","topic":"ui","level":2},{"id":"RyGFEmimwoM","title":"Usability Testing Tips & Tools: Powerful UX Research Method","by":"ProjectUX","topic":"ui","level":2},{"id":"FBDVzr0peO4","title":"Full App Design Course - High Fidelity UI/UX in Figma","by":"Malewicz","topic":"ui","level":2},{"id":"N-34Q9mhwvs","title":"UX/UI Portfolio + Case Study FULL COURSE","by":"Malewicz","topic":"ui","level":2},{"id":"Uk_CMjetw7g","title":"UX Portfolio: How to Create a UX Design Case Study","by":"vaexperience","topic":"ui","level":2},{"id":"jt1WroGHvBs","title":"Creating a UX Design Portfolio Case Study","by":"NNgroup","topic":"ui","level":2},{"id":"aQQ3hdLMwvc","title":"How to Design a UI UX Case Study for your Portfolio?: Made from Scratch Ep.3","by":"Alfred Designs","topic":"ui","level":2},{"id":"so731i7IB7o","title":"Components with Variants and Auto Layout – Advanced Figma Tutorial","by":"Javier Alaves","topic":"ui","level":3},{"id":"YtBOJKuEz9g","title":"Advanced Figma Prototyping Tips & Tricks | 2023 – by moonlearning.io","by":"moonlearning","topic":"ui","level":3},{"id":"o3r1CBEFYX4","title":"Figma for Edu: Advanced protototyping techniques","by":"Figma","topic":"ui","level":3},{"id":"uIKWTkUvWGc","title":"Figma / Advanced Auto-Layout Tutorial","by":"Danny Sapio","topic":"ui","level":3},{"id":"xUprTCzPZbA","title":"Figma Workshop: Advanced Auto layout","by":"Design Buddies Community","topic":"ui","level":3},{"id":"GyUyxdvGdko","title":"UX Portfolio Review: Senior Product Designer's Project Under NDA","by":"vaexperience","topic":"ui","level":3},{"id":"Ds51jG10uBE","title":"My UX Design Case Study Presentation that Got Me Hired | Case Study Walkthrough","by":"Sharon Onyinye","topic":"ui","level":3},{"id":"YYhaZop92Fg","title":"Typography for Beginners: Fonts, Spacing and Layout Basics","by":"4 The Creatives","topic":"design","level":1},{"id":"p8aNF7tUtsQ","title":"Typography in Graphic Design: Complete Beginner’s Guide | Fonts, Spacing @LaibaGraphicSpark","by":"Laiba Graphic Spark","topic":"design","level":1},{"id":"yAuUDyUC-GM","title":"The Ultimate Guide to Typography | FREE COURSE","by":"Envato Tuts+","topic":"design","level":1},{"id":"SnxFkHqN1RA","title":"Graphic Design Essentials: Free Course","by":"Flux Academy","topic":"design","level":1},{"id":"7mZ2fsA9APQ","title":"Learn Graphic Design Theory | New Udemy Course","by":"Video School","topic":"design","level":1},{"id":"FXhs-2Z8akI","title":"How to Use Color Theory for Graphic Designers","by":"4 The Creatives","topic":"design","level":1},{"id":"_2LLXnUdUIc","title":"Beginning Graphic Design: Color","by":"LearnFree","topic":"design","level":1},{"id":"75DRjWzI6DA","title":"The SECRET Behind Great Color Combinations 🎨","by":"Hamza Imtiaz","topic":"design","level":1},{"id":"LY7tDYZC1Jw","title":"Graphic Design Full Course 2026 | Zero to Pro in Illustrator, Photoshop & InDesign","by":"Hammad Sayed","topic":"design","level":1},{"id":"a4Pj9MAPtuo","title":"The ONLY Typography Video Graphic Designers Need To See!","by":"Satori Graphics","topic":"design","level":2},{"id":"PMVsx_4FyVU","title":"Create a Color Theory Poster","by":"Design Studio Academy","topic":"design","level":2},{"id":"x3CAA1Ykh-c","title":"Color Theory for Designers (Pro Tips You Must Know!)","by":"GraphiqVibe","topic":"design","level":2},{"id":"5GVLHSdz52M","title":"Contrast In Colour - Visual Hierarchy In Poster Design | Design Lesson","by":"Gareth David Studio","topic":"design","level":2},{"id":"2EQ6xhdB-RQ","title":"Let's Design a Poster: Make Your Art Pop with Color And Contrast With Spencer Nugent","by":"Adobe Live","topic":"design","level":2},{"id":"11ebWRsA6pM","title":"Powerhouse Design Trio: Photoshop + Illustrator + InDesign | Adobe Creative Cloud","by":"Adobe Creative Cloud","topic":"design","level":3},{"id":"p4kJvwkZhhk","title":"76-Turning Illustrator paths into Photoshop shapes","by":"Graphic Design Quick Start","topic":"design","level":3},{"id":"A902P0YFgAc","title":"Advanced Blend Tool Design in Illustrator","by":"Yes I'm a Designer","topic":"design","level":3},{"id":"n8KoAHCwnMQ","title":"7 steps to creating a brand identity","by":"Marq — Build on-brand content that hits ","topic":"brand","level":1},{"id":"TF4_T7yMTOA","title":"How to Design a Logo - From Start to Finish.","by":"Shantanu Kumar","topic":"brand","level":1},{"id":"-EA4Ml0VU2w","title":"Logo Design Tutorial in Under 5 Minutes","by":"4 The Creatives","topic":"brand","level":1},{"id":"8Co0kGCRQSw","title":"Brand Guidelines - The Essential Contents","by":"Typefool","topic":"brand","level":1},{"id":"RXV46wW_5OM","title":"What Are Brand Guidelines?","by":"Akrivi","topic":"brand","level":1},{"id":"vaqBJ2dX-Cs","title":"How to Design Brand Identity | Full Step by Step Process","by":"GraphiqVibe","topic":"brand","level":2},{"id":"4uWtmSzCcpY","title":"How to Design a Brand Identity from Scratch | Full Process","by":"Anik Jain","topic":"brand","level":2},{"id":"tNAEu4JPiZ4","title":"Breaking Down My Brand Identity Design Process 2024 🔥","by":"Will Paterson","topic":"brand","level":2},{"id":"Nj8awGyr_oE","title":"The ONLY Logo Design Tutorial You'll Ever Need! (Professional Reveals All)","by":"Satori Graphics","topic":"brand","level":2},{"id":"fZ74KiOxpmA","title":"Case Study: Brand Identity Design Project for Jor","by":"Typefool","topic":"brand","level":2},{"id":"VGLttMQOU_M","title":"How I Build Brand Guidelines for Clients (+ What’s Inside)","by":"Megan Weeks","topic":"brand","level":2},{"id":"kW5-OZTruJY","title":"How To Create a Brand Guideline (REAL Client Example)","by":"Megan Weeks","topic":"brand","level":2},{"id":"YqIJNwiSXeM","title":"What to include in Brand Guidelines (Real Example)","by":"Jeremy Mura","topic":"brand","level":2},{"id":"DOFNWMvFkms","title":"BRAND DESIGN PROCESS: How to Put Together a Brand Guide","by":"Megan Weeks","topic":"brand","level":2},{"id":"JI_9IUwKrAQ","title":"Workshop: How to Create Brand Guidelines in Under 1 Hour (2025 Update!)","by":"The Color Palette Studio","topic":"brand","level":2},{"id":"kd_y24QFuHU","title":"Creating brand guidelines for a tech company (my process)","by":"CharliMarieTV","topic":"brand","level":3},{"id":"NfJbbSqE6aI","title":"Brand Strategy & Creative Direction | Client Brand Design Process","by":"Gloria Condy","topic":"brand","level":3},{"id":"7jS1Rm3wB4g","title":"Art Direction: Mood Boards, Design Packets And Callout Sheets","by":"ArtOfSoulburn","topic":"direction","level":1},{"id":"lHsX7VYdxpY","title":"Art Direction: Writing A Concept Brief","by":"ArtOfSoulburn","topic":"direction","level":1},{"id":"Jjt-ZXY4eRY","title":"100 Art Direction Ideas - Build Your Creative Toolkit","by":"orenmeetsworld","topic":"direction","level":1},{"id":"KNBIoyMFNMs","title":"How To Give & Take Art Director Feedback","by":"Open Door Creative","topic":"direction","level":2},{"id":"O6Zordo0OXE","title":"How To Give Feedback To Teams That Empower & Engage Creativity","by":"The Futur","topic":"direction","level":2},{"id":"9AZ2mbH4VKg","title":"How to do design critique - my design feedback framework you should implement in product & UX design","by":"nikitisza","topic":"direction","level":2},{"id":"AhXCCvddR7s","title":"How to get design feedback","by":"femke.design","topic":"direction","level":2},{"id":"QCRy343IaCY","title":"How to Run a Design Critique to Improve Team Collaboration // Aaron Irizarry","by":"ShopifyDevs","topic":"direction","level":2},{"id":"d0KQiLFUy1c","title":"Steps To Creating An Ad Campaign From Scratch","by":"Open Door Creative","topic":"direction","level":2},{"id":"FjR2mLYnyx0","title":"Creative Brief 101: From Brief to Big Idea (With Real Advertising Examples)","by":"Stuff About Advertising","topic":"direction","level":2},{"id":"SlpE3rQP3q8","title":"From Headlines to Campaigns: What Advertising Copywriters Actually Do","by":"Stuff About Advertising","topic":"direction","level":2},{"id":"aO3GHgz4wZw","title":"Cinematic set design, art direction, pre production, mood board, props, and setting up for success.","by":"New Branch Films","topic":"direction","level":3},{"id":"5ODCB1Ez5Zs","title":"Cinematic CAMERA MOVEMENTS Explained | Cinematography & Filmmaking Part 4","by":"Shawn Dolinski","topic":"video","level":2},{"id":"eXd-LyrNLN8","title":"Adding Camera Movement to Your Shots (Cinematography Basics)","by":"Video School","topic":"video","level":2},{"id":"s8VMCbEioFM","title":"How to Add Camera Movement to Your Cinematography (All By Yourself)","by":"Dylan Batista","topic":"video","level":2},{"id":"BWgcb7uiO7c","title":"Cinematic Film Composition — Roger Deakins on Blocking, Staging & Composition in Cinematography","by":"StudioBinder","topic":"video","level":3},{"id":"SOeAnM8BtYg","title":"I Found 50 UNIQUE Camera Moves to Make YOU a Better Filmmaker","by":"Kind of a Filmmaker","topic":"video","level":3}];

function libLevelOf(c) {
  if (LIB_LEVEL_OVERRIDE[c.id]) return LIB_LEVEL_OVERRIDE[c.id];
  const l = String(c.level || '');
  if (/^(Foundation|Basics)$/.test(l)) return 1;
  if (/^(Practitioner|Intermediate)$/.test(l)) return 2;
  if (l) return 3;
  return /^(core)/.test(c.id) ? 1 : 2;
}
let libState = (() => { try { return JSON.parse(localStorage.getItem(LIB_KEY)) || {}; } catch (e) { return {}; } })();
libState.answers = libState.answers || { topics: [], level: 0, goal: '', time: '' };
libState.mine = libState.mine || [];
function libSave() { try { localStorage.setItem(LIB_KEY, JSON.stringify(libState)); } catch (e) {} }

function libCourses() {
  const out = [];
  Object.entries(LIB_TOPIC_OF).forEach(([topic, ids]) => ids.forEach(id => {
    const c = COURSE_INDEX[id]; if (!c) return;
    const vs = (c.videos && c.videos.length) ? c.videos : (youtubeId(c.url) ? [{ id: youtubeId(c.url), title: c.title, by: '' }] : []);
    out.push({ c, topic, level: libLevelOf(c), videos: vs });
  }));
  return out;
}
function libAllVideos() {
  const seen = new Set(); const out = [];
  libCourses().forEach(x => x.videos.forEach(v => {
    if (seen.has(v.id)) return; seen.add(v.id);
    out.push({ id: v.id, title: v.title, by: v.by || '', topic: x.topic, level: x.level, course: x.c.title });
  }));
  LIB_EXTRA.forEach(v => { if (!seen.has(v.id)) { seen.add(v.id); out.push({ id: v.id, title: v.title, by: v.by, topic: v.topic, level: v.level, course: '' }); } });
  return out;
}

function libRecommend() {
  const a = libState.answers;
  const goal = LIB_GOALS.find(g => g.id === a.goal);
  const topics = [...new Set([...(a.topics || []), ...(goal ? goal.topics : [])])];
  const hw = (LIB_TIME.find(t => t.id === a.time) || { h: 5 }).h;
  const cap = hw * 12;                       // a plan that fits in about 3 months at this pace
  const lv = a.level || 1;
  const all = libCourses();
  const queues = topics.map(t => {
    const q = all.filter(x => x.topic === t && (x.level === lv || x.level === lv + 1))
      .sort((p, q2) => Math.abs(p.level - lv) - Math.abs(q2.level - lv) || p.level - q2.level || (p.c.hours || 0) - (q2.c.hours || 0));
    return { t, q: (a.topics || []).includes(t) ? q : q.slice(0, 2) };
  });
  const picked = []; let hours = 0, more = true;
  const used = new Set();
  while (more) {
    more = false;
    for (const { t, q } of queues) {
      const x = q.shift(); if (!x) continue; more = true;
      if (used.has(x.c.id) || hours + (x.c.hours || 0) > cap) continue;
      used.add(x.c.id); hours += x.c.hours || 0;
      const why = [];
      if ((a.topics || []).includes(t)) why.push('You picked ' + LIB_TOPICS.find(z => z.id === t).name);
      else why.push('Supports your goal: ' + goal.name.toLowerCase());
      why.push(x.level === lv ? 'matches your level' : 'a step up from your level');
      picked.push({ ...x, why: why.join(', ') });
    }
  }
  if (goal) goal.pin.forEach(id => {
    const x = all.find(z => z.c.id === id);
    if (x && !used.has(id) && hours + (x.c.hours || 0) <= cap + 6) { used.add(id); hours += x.c.hours || 0; picked.push({ ...x, why: 'Built for your goal: ' + goal.name.toLowerCase() }); }
  });
  picked.sort((p, q2) => p.level - q2.level);   // easier first, stable within a level
  const weeks = Math.max(1, Math.round(hours / hw));
  const topicHours = topics.map(t => ({ t, h: picked.filter(x => x.topic === t).reduce((s2, x) => s2 + (x.c.hours || 0), 0) })).filter(z => z.h);
  const extras = libAllVideos().filter(v => !v.course && topics.includes(v.topic) && (v.level === lv || v.level === lv + 1)).slice(0, 24);
  return { picked, hours, weeks, hw, goal, topicHours, extras, lv };
}

function libVidCard(v) {
  return `<a class="vid vid--s" href="https://www.youtube.com/watch?v=${esc(v.id)}" target="_blank" rel="noopener" aria-label="Watch: ${esc(v.title)}">
    <span class="vid__img"><img src="https://img.youtube.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy" onerror="this.closest('.vid').remove()"><span class="vid__play" aria-hidden="true">▶</span></span>
    <span class="vid__title">${esc(v.title)}</span>${v.by ? `<span class="vid__by">${esc(v.by)}</span>` : ''}</a>`;
}
function libCourseCard(x) {
  const c = x.c, mine = libState.mine.includes(c.id);
  const shown = x.videos.slice(0, 4), rest = x.videos.slice(4);
  return `<article class="rec" data-cid="${esc(c.id)}">
    <div class="rec__top">
      <div>
        <div class="rec__meta"><span class="lvl lvl--${['', 'foundation', 'intermediate', 'senior'][x.level]}">${LIB_LEVELS[x.level]}</span>
          <span class="rec__small">${c.hours ? c.hours + ' h' : ''} · ${x.videos.length} video${x.videos.length === 1 ? '' : 's'}</span></div>
        <h3 class="rec__title">${esc(c.title)}</h3>
      </div>
      <button class="btn ${mine ? '' : 'btn--ghost'} btn--small rec__add" data-add="${esc(c.id)}">${mine ? '✓ In my list' : '+ Add to my list'}</button>
    </div>
    <p class="rec__why">${esc(c.objective)}</p>
    <div class="vids__grid">${shown.map(libVidCard).join('')}</div>
    ${rest.length ? `<details class="rec__more"><summary>Show ${rest.length} more video${rest.length === 1 ? '' : 's'}</summary><div class="vids__grid">${rest.map(libVidCard).join('')}</div></details>` : ''}
  </article>`;
}

const LIB_STEPS = 2;
function libOpt(group, id, name, sub, on, multi) {
  return `<button type="button" class="opt ${on ? 'is-on' : ''}" data-q="${group}" data-v="${id}" aria-pressed="${on}">
    <span class="opt__mark">${multi ? '' : ''}</span><span class="opt__name">${esc(name)}</span><span class="opt__sub">${esc(sub || '')}</span></button>`;
}
function libQuizHTML() {
  const a = libState.answers, st = Math.min(libState.step || 0, LIB_STEPS - 1);
  const steps = [
    { t: 'What do you want to learn?', h: 'Pick as many as you like.', body: LIB_TOPICS.map(t => libOpt('topics', t.id, t.name, LIB_TOPIC_SUB[t.id], a.topics.includes(t.id), true)).join(''), multi: true, ok: a.topics.length > 0 },
    { t: 'Where are you today?', h: 'Be honest. It decides where your plan starts.', body: [1, 2, 3].map(n => libOpt('level', n, LIB_LEVELS[n], LIB_LEVEL_SUB[n], a.level === n)).join('') }
  ];
  const s2 = steps[st];
  return `<div class="wiz">
    <div class="wiz__bar"><span style="width:${(st / LIB_STEPS) * 100}%"></span></div>
    <div class="wiz__count">Question ${st + 1} of ${LIB_STEPS}</div>
    <h2 class="wiz__t">${s2.t}</h2><p class="wiz__h">${s2.h}</p>
    <div class="opts opts--${st === 0 ? 'wide' : 'norm'}">${s2.body}</div>
    <div class="wiz__nav">
      <button class="btn btn--ghost" id="lib-back" ${st === 0 ? 'hidden' : ''}>Back</button>
      ${(s2.multi || st === LIB_STEPS - 1) ? `<button class="btn" id="lib-next" ${(s2.multi ? s2.ok : !!a.level) ? '' : 'disabled'}>${st === LIB_STEPS - 1 ? 'Build my plan' : 'Next'}</button>` : ''}
    </div></div>`;
}
function libSummaryHTML() {
  const a = libState.answers, g = LIB_GOALS.find(x => x.id === a.goal), t = LIB_TIME.find(x => x.id === a.time);
  return `<div class="sum"><div class="sum__chips">
    ${a.topics.map(id => '<span class="sum__c">' + esc(LIB_TOPICS.find(z => z.id === id).name) + '</span>').join('')}
    <span class="sum__c sum__c--n">${LIB_LEVELS[a.level]}</span></div>
    <button class="btn btn--ghost btn--small" id="lib-edit">Change my answers</button></div>`;
}

function libResultsHTML() {
  const r = libRecommend();
  if (!r.picked.length) return '<p class="empty">No courses match those answers yet. Try another level or add more interests.</p>';
  const allIn = r.picked.every(x => libState.mine.includes(x.c.id));
  const mx = Math.max(...r.topicHours.map(z => z.h), 1);
  let h = `<div class="plan">
    <p class="eyebrow">Your plan</p>
    <h2 class="h-l">${r.picked.length} courses, ${r.hours} hours, about ${r.weeks} weeks</h2>
    <p class="lede small mt-s">Built from your answers. At ${r.hw} hours a week you can finish it in about ${r.weeks} weeks. Start at step 1 and go in order. Remove anything you do not want.</p>
    <div class="plan__split">${r.topicHours.map(z => `<div class="plan__row"><span>${esc(LIB_TOPICS.find(x => x.id === z.t).name)}</span><span class="plan__bar"><i style="width:${Math.round(z.h / mx * 100)}%"></i></span><b>${z.h} h</b></div>`).join('')}</div>
    <div class="plan__go"><button class="btn" id="lib-addall">${allIn ? '✓ Whole plan is in my list' : 'Add the whole plan to my list'}</button></div>
  </div>`;
  let wk = 0;
  h += '<div class="steps">' + r.picked.map((x, i) => {
    const start = Math.floor(wk) + 1; wk += (x.c.hours || 0) / r.hw;
    return `<div class="step"><div class="step__n">${i + 1}</div><div class="step__b"><div class="step__when">${Math.ceil(wk) > start ? 'Weeks ' + start + ' to ' + Math.ceil(wk) : 'Week ' + start} · ${esc(x.why)}</div>${libCourseCard(x)}</div></div>`;
  }).join('') + '</div>';
  if (r.extras.length) h += `<div class="lib-more"><div class="sub-label">Extra videos on your topics</div><div class="vids__grid">${r.extras.map(libVidCard).join('')}</div></div>`;
  return h;
}

function libMineHTML() {
  const items = libState.mine.map(id => COURSE_INDEX[id]).filter(Boolean);
  if (!items.length) return '<p class="lede small">Your list is empty. Use “Add to my list” on any recommended course.</p>';
  const hours = items.reduce((s, c) => s + (c.hours || 0), 0);
  return `<div class="prog__top"><span><b>${items.length}</b> course${items.length === 1 ? '' : 's'} · <b>${hours}</b> hours</span></div>
    <ul class="mine">${items.map(c => `<li><span>${esc(c.title)}</span><button class="mine__x" data-rm="${esc(c.id)}" aria-label="Remove ${esc(c.title)}">✕</button></li>`).join('')}</ul>`;
}

let libFilter = { topic: '', level: 0, q: '', n: 48 };
function libAllHTML() {
  const q = libFilter.q.trim().toLowerCase();
  const all = libAllVideos().filter(v => (!libFilter.topic || v.topic === libFilter.topic) && (!libFilter.level || v.level === libFilter.level) && (!q || (v.title + ' ' + v.by + ' ' + v.course).toLowerCase().includes(q)));
  const shown = all.slice(0, libFilter.n);
  return `<p class="lede small">${all.length} video${all.length === 1 ? '' : 's'}</p>
    <div class="vids__grid vids__grid--lib mt-s">${shown.map(libVidCard).join('') || '<p class="empty">Nothing matches. Try another topic or word.</p>'}</div>
    ${all.length > shown.length ? '<div class="lib-showmore"><button class="btn btn--ghost" id="lib-more">Show more</button></div>' : ''}`;
}

function libRefreshAdd(id) {
  $$('#lib-results [data-add="' + id + '"]').forEach(btn => {
    const on = libState.mine.includes(id);
    btn.textContent = on ? '✓ In my list' : '+ Add to my list'; btn.classList.toggle('btn--ghost', !on);
  });
  const all = $('#lib-addall');
  if (all) { const r = libRecommend(); all.textContent = r.picked.every(x => libState.mine.includes(x.c.id)) ? '✓ Whole plan is in my list' : 'Add the whole plan to my list'; }
}
function libShowQuiz() {
  const done = libState.shown;
  $('#lib-quiz').innerHTML = done ? libSummaryHTML() : libQuizHTML();
  $('#lib-results').innerHTML = done ? libResultsHTML() : '';
}
function renderLibrary() {
  $('#lib-count').textContent = libAllVideos().length;
  libShowQuiz();
  $('#lib-mine').innerHTML = libMineHTML();
  $('#lib-filters').innerHTML = `<div class="filters">
      <button class="filter ${!libFilter.topic ? 'is-on' : ''}" data-ft="">All topics</button>
      ${LIB_TOPICS.map(t => `<button class="filter ${libFilter.topic === t.id ? 'is-on' : ''}" data-ft="${t.id}">${esc(t.name)}</button>`).join('')}
    </div>
    <div class="filters mt-s">
      <button class="filter ${!libFilter.level ? 'is-on' : ''}" data-fl="0">Any level</button>
      ${[1, 2, 3].map(n => `<button class="filter ${libFilter.level === n ? 'is-on' : ''}" data-fl="${n}">${LIB_LEVELS[n]}</button>`).join('')}
    </div>`;
  $('#lib-all').innerHTML = libAllHTML();
}
function libFinish() {
  libState.shown = true; libSave(); libShowQuiz();
  $('#lib-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('click', e => {
  if (!$('#view-library') || !$('#view-library').classList.contains('is-active')) return;
  const t = e.target.closest('button'); if (!t) return;
  const a = libState.answers;
  if (t.dataset.q) {
    const g = t.dataset.q, v = t.dataset.v;
    if (g === 'topics') { a.topics = a.topics.includes(v) ? a.topics.filter(x => x !== v) : [...a.topics, v]; libSave(); $('#lib-quiz').innerHTML = libQuizHTML(); return; }
    if (g === 'level') a.level = +v; else a[g] = v;
    libSave(); $('#lib-quiz').innerHTML = libQuizHTML();
    
  } else if (t.id === 'lib-next') {
    if ((libState.step || 0) >= LIB_STEPS - 1) libFinish(); else { libState.step = (libState.step || 0) + 1; libSave(); libShowQuiz(); }
  } else if (t.id === 'lib-back') {
    libState.step = Math.max(0, (libState.step || 0) - 1); libSave(); libShowQuiz();
  } else if (t.id === 'lib-edit') {
    libState.shown = false; libState.step = 0; libSave(); libShowQuiz(); $('#lib-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (t.id === 'lib-addall') {
    const r = libRecommend(), ids = r.picked.map(x => x.c.id);
    const every = ids.every(id => libState.mine.includes(id));
    libState.mine = every ? libState.mine.filter(id => !ids.includes(id)) : [...new Set([...libState.mine, ...ids])];
    libSave(); $('#lib-mine').innerHTML = libMineHTML(); ids.forEach(libRefreshAdd);
    toast(every ? 'Plan removed from your list' : 'Plan added to your list', ids.length + ' courses');
  } else if (t.dataset.add) {
    const id = t.dataset.add;
    libState.mine = libState.mine.includes(id) ? libState.mine.filter(x => x !== id) : [...libState.mine, id];
    libSave(); $('#lib-mine').innerHTML = libMineHTML(); libRefreshAdd(id);
    if (libState.mine.includes(id)) toast('Added to your list', COURSE_INDEX[id].title);
  } else if (t.dataset.rm) {
    libState.mine = libState.mine.filter(x => x !== t.dataset.rm); libSave();
    $('#lib-mine').innerHTML = libMineHTML(); libRefreshAdd(t.dataset.rm);
  } else if (t.dataset.ft !== undefined) {
    libFilter.topic = t.dataset.ft; libFilter.n = 48; renderLibrary();
  } else if (t.dataset.fl !== undefined) {
    libFilter.level = +t.dataset.fl; libFilter.n = 48; renderLibrary();
  } else if (t.id === 'lib-more') {
    libFilter.n += 48; $('#lib-all').innerHTML = libAllHTML();
  }
});
document.addEventListener('input', e => {
  if (e.target.id === 'lib-search') { libFilter.q = e.target.value; libFilter.n = 48; $('#lib-all').innerHTML = libAllHTML(); }
});
