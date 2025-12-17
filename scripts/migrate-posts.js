/**
 * Migration script to flatten post folder structure.
 * 
 * Before: posts/<locale>/<category>/<slug>.mdx
 * After:  posts/<locale>/<slug>.md
 * 
 * Adds `tag` field to frontmatter based on the original category folder.
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const POSTS_DIR = path.join(process.cwd(), 'posts');

function migrate() {
    const locales = ['en-US', 'zh-CN'];
    
    for (const locale of locales) {
        const localeDir = path.join(POSTS_DIR, locale);
        
        if (!fs.existsSync(localeDir)) {
            console.log(`Locale directory not found: ${localeDir}`);
            continue;
        }
        
        // Get all .mdx files
        const pattern = path.join(localeDir, '**/*.mdx');
        const files = globSync(pattern, { nodir: true });
        
        console.log(`\nProcessing ${locale}: Found ${files.length} posts`);
        
        for (const filePath of files) {
            const relativePath = path.relative(localeDir, filePath);
            const parts = relativePath.split(path.sep);
            
            // Skip if already in flat structure (no category folder)
            if (parts.length < 2) {
                console.log(`  Skipping (already flat): ${relativePath}`);
                continue;
            }
            
            const category = parts[0];
            const filename = parts[parts.length - 1];
            
            // Skip category.config.js files
            if (filename === 'category.config.js') {
                continue;
            }
            
            // Read file content
            let content = fs.readFileSync(filePath, 'utf-8');
            
            // Parse frontmatter
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
            
            if (frontmatterMatch) {
                const frontmatter = frontmatterMatch[1];
                
                // Check if tag already exists
                if (!frontmatter.includes('tag:')) {
                    // Add tag to frontmatter
                    const newFrontmatter = `${frontmatter}\ntag: ${category}`;
                    content = content.replace(frontmatterMatch[1], newFrontmatter);
                }
            } else {
                // No frontmatter, create one
                content = `---\ntag: ${category}\n---\n\n${content}`;
            }
            
            // New file path (flat structure, .md extension)
            const newFilename = filename.replace('.mdx', '.md');
            const newFilePath = path.join(localeDir, newFilename);
            
            // Check for filename collision
            if (fs.existsSync(newFilePath) && newFilePath !== filePath) {
                console.log(`  WARNING: File collision for ${newFilename}, skipping...`);
                continue;
            }
            
            // Write new file
            fs.writeFileSync(newFilePath, content, 'utf-8');
            console.log(`  Migrated: ${relativePath} -> ${newFilename}`);
            
            // Delete old file
            fs.unlinkSync(filePath);
        }
        
        // Remove empty category folders and config files
        const categoryDirs = fs.readdirSync(localeDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        for (const categoryDir of categoryDirs) {
            const categoryPath = path.join(localeDir, categoryDir);
            const configPath = path.join(categoryPath, 'category.config.js');
            
            // Remove config file if exists
            if (fs.existsSync(configPath)) {
                fs.unlinkSync(configPath);
                console.log(`  Removed config: ${categoryDir}/category.config.js`);
            }
            
            // Remove directory if empty
            const remaining = fs.readdirSync(categoryPath);
            if (remaining.length === 0) {
                fs.rmdirSync(categoryPath);
                console.log(`  Removed empty folder: ${categoryDir}/`);
            }
        }
    }
    
    console.log('\nMigration complete!');
}

migrate();

