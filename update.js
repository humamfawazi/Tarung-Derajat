const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();
const filesToUpdate = [
    'database/migrations/2026_04_22_100000_create_display_settings_table.php',
    'database/migrations/2026_04_11_190000_create_landing_sections_table.php',
    'app/Models/DisplaySetting.php',
    'routes/web.php',
    'app/Http/Controllers/AdminLandingController.php',
    'app/Http/Controllers/ContentController.php',
    'app/Http/Controllers/AdminDisplaySettingController.php',
    'resources/js/Layouts/PublicLayout.jsx',
    'resources/js/Pages/Videos/Index.jsx',
    'resources/js/Pages/Videos/Detail.jsx',
    'resources/js/Pages/Content/Create.jsx',
    'resources/js/Pages/Public/Edukasi.jsx',
    'resources/js/Pages/Public/KompetisiEvent.jsx',
    'resources/js/Pages/Public/Informasi.jsx',
    'resources/js/Pages/Public/Home.jsx',
    'resources/js/Pages/Admin/DisplaySettings/Edit.jsx',
    'resources/js/Pages/Admin/Content/Index.jsx',
    'resources/js/Pages/Admin/Landing/Create.jsx',
    'resources/js/Pages/Admin/Landing/Index.jsx',
    'resources/js/Pages/Admin/Landing/Edit.jsx'
];

filesToUpdate.forEach(file => {
    let fullPath = path.join(baseDir, file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    content = content.replace(/education_user_limit/g, 'event_user_limit');
    content = content.replace(/educationSections/g, 'eventSections');
    content = content.replace(/feature_education/g, 'feature_event');
    content = content.replace(/'education'/g, "'event'");
    content = content.replace(/\"education\"/g, '"event"');
    content = content.replace(/education_%/g, 'event_%');
    content = content.replace(/educationTitle/g, 'eventTitle');
    content = content.replace(/educationText/g, 'eventText');
    content = content.replace(/\"Education\"/gi, '"Kompetisi & Event"');
    content = content.replace(/'Education'/gi, "'Kompetisi & Event'");
    content = content.replace(/Education:/g, 'Kompetisi & Event:');
    content = content.replace(/Limit Education/g, 'Limit Kompetisi & Event');
    content = content.replace(/jumlah item education/gi, 'jumlah item kompetisi dan event');
    content = content.replace(/type history\/philosophy\/education/gi, 'type history/philosophy/event');
    content = content.replace(/>Education</g, '>Kompetisi & Event<');
    content = content.replace(/Konten edukasi/g, 'Konten kompetisi dan event');
    content = content.replace(/feature,history,philosophy,education/g, 'feature,history,philosophy,event');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated: ' + file);
});
