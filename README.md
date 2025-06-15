# 🏭 Bonhoeffer Machines Website

<div align="center">

![Logo](public/logo.png)

**Professional Machinery & Equipment Website**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

*A comprehensive, professional website system featuring true parallax effects, dynamic product catalogs, and modern user experience design.*

[🚀 Live Demo](#https://bm.nakul.click)

</div>

---

## 🌟 Overview

The Bonhoeffer Machines website is a cutting-edge, professional platform designed to showcase an extensive range of industrial machinery and equipment. Built with modern web technologies, it delivers an exceptional user experience through authentic parallax scrolling, interactive product catalogs, and comprehensive business systems.

### 🎯 Key Highlights

- **🔥 True Parallax Effects** - Multi-depth background layers with 3D perspective
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ High Performance** - Lighthouse score optimized with Core Web Vitals
- **🎨 Modern Design** - Professional UI with smooth animations
- **🌍 Multi-Language** - Spanish, English, and Portuguese support
- **🔍 SEO Optimized** - Structured data and meta tags for search engines

---

## ✨ Features

### 🏠 **Core Pages**
- **Home Page** - Hero section with animated product showcase
- **About Us** - Company story, mission, vision, and team
- **Products** - Comprehensive 12-category product catalog
- **Spare Parts** - 3-tier navigation system with 54+ parts
- **Contact Us** - Professional contact form with Google Maps
- **Certifications** - Government certificates with modal popups

### 🛠️ **Advanced Components**

#### 🌀 **True Parallax System**
```javascript
// Multi-depth background layers with scroll-responsive transformations
const getParallaxTransform = (depth, type) => {
  const baseMove = (scrollProgress - 0.5) * 100;
  return `translate3d(0, ${baseMove * depth}px, 0) rotateY(${rotation}deg)`;
};
```

#### 🎮 **Interactive Dropdowns**
- **2-second delay** after mouse leaves for smooth navigation
- **Smart timeout management** with automatic cleanup
- **Category hover effects** with instant product display

#### 🎨 **Background Layout Template**
- **Global particle system** with 20 animated particles
- **Consistent gradient backgrounds** across all pages
- **Automatic header/footer inclusion** for unified design

### 📦 **Product System**

#### 12 Product Categories
| Category | Products | Features |
|----------|----------|----------|
| 🚜 **Agro Industrial** | Water pumps, engines, tillers | Heavy-duty agricultural equipment |
| 🌲 **Garden & Forestry** | Chainsaws, brush cutters, mowers | Professional landscaping tools |
| ⚙️ **Diesel Machines** | Generators, pumps, engines | Reliable diesel-powered equipment |
| ⚡ **Electric Machines** | Pressure washers, motors | Energy-efficient electric tools |
| ☀️ **Solar** | Panels, pumps, systems | Sustainable energy solutions |
| 💧 **Sprayers** | Gasoline, manual, atomizers | Precision application equipment |
| 🏠 **Domestic & Commercial** | Generators, vacuums | Home and business solutions |
| 🏭 **Industrial** | Welding machines, pumps | Heavy-duty industrial equipment |
| 🏗️ **Construction** | Compactors, cutters, vibrators | Construction and concrete tools |
| 🔧 **Tools** | Augers, garden tools | Specialized hand and power tools |
| 🪵 **Wood Processing** | Chippers, chaff cutters | Wood and agricultural processing |
| ⭐ **Special Segment** | Log splitters, trenchers | Unique specialized equipment |

#### 📋 **Product Features**
- **Detailed Specifications** - Technical data for each model
- **Image Galleries** - Multiple product images with zoom functionality
- **Feature Lists** - Comprehensive benefit descriptions
- **Model Comparison** - Side-by-side specifications
- **Download Center** - Brochures, manuals, and technical sheets
- **FAQ Sections** - Common questions and expert answers

### 🔧 **Spare Parts System**

#### 3-Tier Navigation Structure
```
/spare-parts → /spare-parts/[category] → /spare-parts/[category]/[model]
     ↓              ↓                        ↓
Main Catalog → Part Categories → Specific Models
```

#### 54+ Spare Parts Categories
- **Engine Components** - Pistons, rings, valves, gaskets
- **Fuel Systems** - Carburetors, filters, tanks, lines
- **Electrical Parts** - Spark plugs, coils, starters, alternators
- **Cutting Tools** - Blades, chains, cutting lines, guards
- **Maintenance Items** - Oils, filters, belts, maintenance kits

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** for version control

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd website/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 🔧 Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

### 🌐 Access the Application

- **Development**: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture

### 📁 Project Structure

```
frontend/
├── 📄 README.md                    # Project documentation
├── 📄 SYSTEM_DOCUMENTATION.md      # Comprehensive system guide
├── 📄 DROPDOWN_TIMEOUT_IMPLEMENTATION.md # Dropdown feature docs
├── ⚙️ next.config.mjs               # Next.js configuration
├── ⚙️ tailwind.config.js            # Tailwind CSS configuration
├── ⚙️ package.json                 # Dependencies and scripts
│
├── 📂 app/                         # Next.js App Router
│   ├── 🏠 page.js                  # Home page
│   ├── 📘 about-us/page.js         # About page
│   ├── 📞 contact-us/page.js       # Contact system
│   ├── 🏆 certifications/page.js   # Government certificates
│   ├── 📦 product/                 # Product system
│   │   ├── page.js                 # Main catalog
│   │   ├── [slug]/page.js          # Product categories
│   │   └── [slug]/[model]/page.js  # Model specifications
│   └── 🔧 spare-parts/             # Spare parts system
│       ├── page.js                 # Main parts catalog
│       ├── [slug]/page.js          # Part categories
│       └── [slug]/[model]/page.js  # Part specifications
│
├── 📂 components/                  # Reusable components
│   ├── 🎭 layouts/                 # Layout components
│   │   ├── header.js               # Navigation with dropdowns
│   │   └── footer.js               # Site footer
│   ├── 🎨 sections/                # Page sections
│   │   ├── producty.js             # True parallax showcase
│   │   ├── hero.js                 # Hero sections
│   │   └── products.js             # Product displays
│   └── 📄 templates/               # Page templates
│       └── bgLayout.js             # Background layout system
│
└── 📂 public/                      # Static assets
    ├── 🖼️ logo.png                 # Company logo
    ├── 📸 home-products/           # Product images
    ├── 📸 products/                # Detailed product photos
    ├── 📸 spare-parts/             # Spare parts images
    ├── 🎥 about/                   # About page media
    ├── 🏆 certification/           # Certificate images
    └── 📅 events/                  # Event and fair photos
```

### 🔧 Technology Stack

#### **Frontend Framework**
- **Next.js 15.3.3** - React framework with App Router
- **React 18** - Modern React with concurrent features
- **JavaScript ES2023** - Latest language features

#### **Styling & Design**
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11** - Advanced animations and parallax
- **Custom CSS** - Specialized effects and overrides

#### **Development Tools**
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing and optimization
- **Turbopack** - Ultra-fast bundler for development

#### **Performance & SEO**
- **Next.js Image** - Automatic image optimization
- **WebP Format** - Modern image compression
- **Static Generation** - Pre-rendered pages for speed
- **Meta Tags** - SEO optimization and social sharing

---

## 🎨 Design System

### 🎯 **Brand Colors**
```css
/* Primary Brand Color */
--primary: #989b2e;      /* Olive Green */
--primary-hover: #7a7d24; /* Darker Olive */
--primary-light: #a8ab3e; /* Lighter Olive */

/* Background Gradients */
--bg-dark: linear-gradient(to-br, #1f2937, #374151, #1f2937);
--bg-overlay: rgba(0, 0, 0, 0.6);

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #d1d5db;
--text-accent: #989b2e;
```

### 📐 **Typography Scale**
```css
/* Headings */
.heading-xl: 4rem (64px)    /* Hero titles */
.heading-lg: 3rem (48px)    /* Section titles */
.heading-md: 2rem (32px)    /* Subsection titles */
.heading-sm: 1.5rem (24px)  /* Card titles */

/* Body Text */
.text-lg: 1.125rem (18px)   /* Large body text */
.text-base: 1rem (16px)     /* Default body text */
.text-sm: 0.875rem (14px)   /* Small text */
```

### 🎭 **Animation System**
```javascript
// Standard motion variants
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

### ⚙️ **Next.js Configuration**
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    turbo: {
      rules: {
        '*.webp': ['file-loader']
      }
    }
  }
};
```

### 🎨 **Tailwind Configuration**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#989b2e',
        'primary-dark': '#7a7d24',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'parallax': 'parallax 20s ease-in-out infinite',
      }
    },
  }
}
```

---

## 📱 Responsive Design

### 📐 **Breakpoint System**
```css
/* Mobile First Approach */
sm:  640px  and up    /* Small tablets */
md:  768px  and up    /* Tablets */
lg:  1024px and up    /* Desktop */
xl:  1280px and up    /* Large desktop */
2xl: 1536px and up    /* Extra large screens */
```

### 📱 **Mobile Optimizations**
- **Touch-friendly** button sizes (minimum 44px)
- **Swipe gestures** for product carousels
- **Collapsible navigation** with hamburger menu
- **Optimized images** with responsive sizing
- **Fast loading** with lazy loading and preloading

### 🖥️ **Desktop Features**
- **Hover effects** for enhanced interactivity
- **Keyboard navigation** support
- **Multi-column layouts** for better content organization
- **Advanced animations** with parallax scrolling

---

## 🚀 Performance

### ⚡ **Core Web Vitals**
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### 🎯 **Optimization Techniques**
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - WebP format with Next.js Image
- **Lazy Loading** - Components and images load on demand
- **Tree Shaking** - Remove unused code from bundles
- **Caching** - Static assets and API responses

### 📊 **Bundle Analysis**
```bash
# Analyze bundle size
npm run build
npm run analyze

# Performance audit
npm run lighthouse
```

---

## 🔒 Security

### 🛡️ **Security Features**
- **Content Security Policy (CSP)** headers
- **XSS Protection** with sanitized inputs
- **HTTPS Enforcement** in production
- **Input Validation** on all forms
- **Rate Limiting** on API endpoints

### 🔐 **Best Practices**
- **Environment Variables** for sensitive data
- **Secure Headers** configuration
- **Dependencies Audit** with npm audit
- **CORS Configuration** for API access

---

## 🌍 Internationalization

### 🗣️ **Supported Languages**
- **🇪🇸 Spanish** - Primary market (Latin America)
- **🇺🇸 English** - International market
- **🇧🇷 Portuguese** - Brazilian market

### 🌐 **Implementation**
```javascript
// Language detection and switching
const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
];
```

### 📍 **Localization Features**
- **Automatic language detection** based on browser settings
- **Manual language selection** with persistent storage
- **Currency formatting** for different regions
- **Date and time formatting** according to locale

---

## 🧪 Testing

### ✅ **Testing Strategy**
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e

# Performance tests
npm run test:performance
```

### 🎯 **Test Coverage**
- **Component Testing** - All React components
- **API Testing** - Contact forms and data fetching
- **Accessibility Testing** - WCAG 2.1 AA compliance
- **Performance Testing** - Core Web Vitals monitoring

---

## 📈 Analytics & Monitoring

### 📊 **Analytics Integration**
- **Google Analytics 4** - User behavior tracking
- **Google Search Console** - SEO monitoring
- **Core Web Vitals** - Performance metrics
- **Custom Events** - Business-specific tracking

### 🔍 **Monitoring Tools**
- **Error Tracking** - Real-time error monitoring
- **Performance Monitoring** - Page load times
- **Uptime Monitoring** - Service availability
- **User Experience** - Real user metrics

---

## 🚀 Deployment

### 🌐 **Deployment Options**

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### **Netlify**
```bash
# Build and deploy
npm run build
netlify deploy --prod --dir=out
```

#### **Docker**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 🔄 **CI/CD Pipeline**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: vercel/action@v1
```

---

## 🛠️ Maintenance

### 🔄 **Regular Tasks**
- **Dependency Updates** - Monthly security updates
- **Performance Audits** - Quarterly performance reviews
- **Content Updates** - Product catalog maintenance
- **SEO Optimization** - Ongoing search optimization

### 📋 **Content Management**
```javascript
// Update product data
const newProduct = {
  name: "New Product",
  slug: "new-product",
  image: "/products/new-product.webp",
  category: "agro-industrial"
};
```

### 🔧 **Troubleshooting**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for issues
npm run lint
npm audit
```

---

## 👥 Contributing

### 🤝 **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### 📝 **Coding Standards**
- **ESLint** configuration for consistent code style
- **Prettier** for automatic code formatting
- **Semantic commits** with conventional commit messages
- **Component documentation** with JSDoc comments

### 🔄 **Pull Request Process**
1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update version numbers if applicable

---

## 📞 Support

### 🆘 **Getting Help**
- **📧 Email**: support@bonhoeffermachines.com

### 🐛 **Bug Reports**
When reporting bugs, please include:
- **Browser and version**
- **Operating system**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots or videos**

### 💡 **Feature Requests**
We welcome feature requests! Please provide:
- **Clear description** of the feature
- **Use case** and business value
- **Mockups or examples** if applicable
- **Priority level** and timeline needs

---

## 📄 License

This project is proprietary software owned by **Bonhoeffer Machines**. All rights reserved.

**© 2025 Bonhoeffer Machines. All rights reserved.**

---

## 🙏 Acknowledgments

### 🏆 **Credits**
- **Design System** - Inspired by modern industrial design principles
- **Parallax Effects** - Advanced CSS and JavaScript techniques
- **Performance Optimization** - Next.js and React best practices
- **Image Assets** - Professional product photography

### 🛠️ **Built With**
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

---

<div align="center">

**Made with ❤️ for Bonhoeffer Machines**

[🔝 Back to Top](#-bonhoeffer-machines-website)

</div>
