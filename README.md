# Sourabh's Professional Portfolio 🚀

A modern, fully-featured portfolio website designed specifically for open source contributors and GSSOC participants. With stunning animations, responsive design, and professional styling.

## ✨ Features

🎨 **Modern Design** - Beautiful gradients, smooth animations, and professional color scheme  
📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile devices  
⚡ **Smooth Animations** - Scroll animations, fade-ins, and interactive effects  
🎯 **Multiple Sections** - Hero, About, Experience, Skills, Projects, Timeline, and Contact  
🔗 **Social Integration** - GitHub, LinkedIn, Twitter, Email links ready to use  
📊 **Skills Progress Bars** - Visual representation of your skill levels  
🎓 **Timeline/Experience** - Showcase your learning journey and milestones  
💻 **Code Animation** - Animated code display in hero section  
🌐 **No Dependencies** - Pure HTML, CSS, and JavaScript (uses Font Awesome icons)  

## 📁 File Structure

```
portfolio/
├── index.html           (Main website)
├── style.css           (All styling & responsive design)
├── script.js           (Interactivity & animations)
├── README.md           (This file)
└── CUSTOMIZATION.txt   (Quick customization guide)
```

## 🚀 Quick Start

1. **Open Portfolio**: Double-click `index.html` to view in your browser
2. **Edit Information**: Update your details in `index.html`
3. **Customize Colors** (optional): Modify CSS variables in `style.css`
4. **Update Links**: Replace placeholder URLs with your real links
5. **Test on Mobile**: Check responsiveness on different devices

## 📝 Customization Guide

### 1. **Personal Information** (Lines to edit in `index.html`)

**Hero Section:**
```html
Line 50: <h1> - Update your name and headline
Line 51: <p class="hero-subtitle"> - Your title/role
Line 52: <p class="hero-description"> - Brief description
```

**Contact Section:**
```html
Line 353: Email address
Line 360: GitHub URL
Line 365: LinkedIn URL
Line 368: Twitter URL
```

### 2. **About Section**
Update the text about yourself (Lines 97-99) to describe your journey, skills, and goals for GSSOC.

### 3. **Experience/Timeline**
Customize your learning journey in the timeline section (Lines 138-156):
- Add your actual milestones
- Update dates and descriptions
- Reflect your real experience

### 4. **Skills Section**
Update with YOUR actual skills (Lines 173-226):
- Change skill names
- Adjust percentage bars (0-100%)
- Organize by categories

### 5. **Projects Section**
Replace placeholder projects with your REAL projects (Lines 243-316):
- Update project names
- Add actual descriptions
- Link to your GitHub repositories
- Add live demo links if available
- Update tech stack tags

### 6. **Colors and Styling** (Optional)

Edit CSS variables in `style.css` (Lines 7-19):
```css
:root {
    --primary: #667eea;        /* Main color */
    --secondary: #764ba2;      /* Secondary/gradient color */
    --accent: #f093fb;          /* Accent color */
    --dark: #0f172a;           /* Dark backgrounds */
    --light: #f8fafc;          /* Light backgrounds */
}
```

Try these color combinations:
- **Modern Blue**: `--primary: #667eea`, `--secondary: #764ba2`
- **Tech Purple**: `--primary: #6366f1`, `--secondary: #8b5cf6`
- **Ocean Green**: `--primary: #0ea5e9`, `--secondary: #06b6d4`

### 7. **Social Links**
Update all social media links in Contact section (Lines 350-370):
```html
<a href="https://github.com/YOUR_USERNAME" target="_blank">
<a href="https://linkedin.com/in/YOUR_PROFILE" target="_blank">
<a href="https://twitter.com/YOUR_HANDLE" target="_blank">
<a href="mailto:your.email@example.com">
```

## 🎨 Sections Breakdown

### **Hero Section**
- Eye-catching gradient background
- Animated code display
- Call-to-action buttons
- Professional introduction

### **About Section**
- Personal description
- Key features/expertise
- Statistics (customizable stats)
- Feature highlights

### **Experience Timeline**
- Educational journey
- Milestones and achievements
- Learning progression
- Professional growth

### **Skills Section**
- Organized by categories (Frontend, Backend, Tools)
- Progress bars for each skill
- Visual skill levels (0-100%)
- Easy to update percentages

### **Projects Section**
- 6 project cards with full details
- Technologies used for each project
- GitHub and Live Demo links
- Hover animations
- Perfect for showcasing GSSOC contributions

### **Contact Section**
- Email, Location, GitHub
- Social media links
- Beautiful social icons
- Easy to connect section

## 🎯 Tips for GSSOC

1. **Add Real Projects** - Replace placeholders with actual GitHub repositories
2. **Update Skills** - Be honest about your skill levels
3. **Link Everything** - Ensure all GitHub and social links work
4. **Update Timeline** - Show your actual learning journey
5. **Write Good Descriptions** - Explain what each project does
6. **Add Tech Stack** - Show technologies used in each project
7. **Keep It Updated** - Add new projects as you contribute during GSSOC
8. **Test Everything** - Verify all links before submitting

## 🔧 Advanced Customization

### Add More Projects
Copy a project card and modify:
```html
<div class="project-card">
    <div class="project-header"><i class="fas fa-folder"></i></div>
    <h3>Your Project Name</h3>
    <p>Description here</p>
    <div class="project-tech">
        <span class="tech-tag">Technology1</span>
        <span class="tech-tag">Technology2</span>
    </div>
    <div class="project-links">
        <a href="..." class="project-link" target="_blank">
            <i class="fab fa-github"></i> GitHub
        </a>
    </div>
</div>
```

### Change Number of Skill Categories
Edit the `grid-template-columns` in `.skills-wrapper` CSS (Line ~760):
```css
.skills-wrapper {
    grid-template-columns: repeat(3, 1fr);  /* Change 3 to 2 or 4 */
}
```

### Modify Animation Speed
Edit transition durations in `style.css`:
- Change `0.3s` to `0.5s` for slower animations
- Change `0.3s` to `0.1s` for faster animations

## 📱 Browser Support

✅ Chrome/Edge (Latest)  
✅ Firefox (Latest)  
✅ Safari (Latest)  
✅ Mobile Browsers (iOS Safari, Chrome Mobile)  
✅ Tablets (iPad, Android)  

## ✅ Pre-Submission Checklist

- [ ] Personal name appears correctly (not "Sourabh" if that's not you)
- [ ] About section describes YOUR journey
- [ ] Skills are realistic and honest
- [ ] All projects are YOUR projects or real GSSOC contributions
- [ ] GitHub links are correct and working
- [ ] Project descriptions are clear and detailed
- [ ] Tech stack tags are accurate
- [ ] All social links are correct
- [ ] Email address is valid
- [ ] Portfolio looks good on mobile (test in browser DevTools)
- [ ] All animations work smoothly
- [ ] No broken images or links

## 🎨 Customization Examples

### Change to Dark Mode
Update in `style.css`:
```css
body {
    background-color: #1a1a2e;
    color: #eee;
}
```

### Add More Timeline Items
Duplicate timeline-item div in Experience section and update dates/content

### Adjust Skill Percentages
Change `width: 85%` to your desired percentage in each `.skill-progress` element

## 🚀 Deployment Options

### **Free Hosting**
- **GitHub Pages** - Free forever, perfect for portfolios
- **Netlify** - Drag & drop deployment, free tier available
- **Vercel** - Optimized for web projects, free tier
- **Render** - Simple deployment, free tier

### GitHub Pages Deployment (Easiest)
1. Create GitHub repo named `yourusername.github.io`
2. Upload these files to the repo
3. Access at `https://yourusername.github.io`

## 💡 Pro Tips

- **Keep it Simple** - Less is more. A clean portfolio is memorable.
- **Use Real Photos** - Add profile picture in the hero section for personal touch
- **Regular Updates** - Update projects as you complete GSSOC tasks
- **Mobile First** - Always test on mobile devices
- **Fast Loading** - Avoid heavy images; use icons instead

## 📞 Support

If you need to customize further:
1. Check inline HTML comments for guidance
2. Read CSS variable definitions for color/size options
3. Test changes in browser DevTools first
4. Use browser console for any JavaScript issues

## 🎓 Learning Resources

- **HTML/CSS**: [MDN Web Docs](https://developer.mozilla.org/)
- **Font Awesome Icons**: [fontawesome.com](https://fontawesome.com/)
- **Portfolio Best Practices**: [Stack Overflow Blog](https://stackoverflow.blog/)

---

## Good Luck! 🌟

This portfolio is ready for your GSSOC journey! Customize it with your real information, showcase your projects, and let your work speak for itself.

**Happy coding and open source contributing!** 🚀

---

*Last updated: 2025 | Made for GSSOC Contributors*
