# TeamPulse Dashboard 🚀

A modern, interactive team management dashboard built with React and Vite. TeamPulse helps teams track projects, manage tasks, monitor team member status, and collaborate effectively in real-time.

**🌐 Live Demo:** [team-pulse-inky.vercel.app](https://team-pulse-inky.vercel.app/)

## 📸 Screenshots

### Main Dashboard - Status Management
![Status Selection](Screenshot-245.jpg)
*Update your work status with intuitive status cards (Working, Break, Meeting, Offline)*

### Team Lead View - Team Overview & Task Assignment
![Team Lead Dashboard](Screenshot-248.jpg)
*Team Lead interface showing team overview and task assignment functionality*

### Task Management - Light Theme
![Task Management Light](Screenshot-246.jpg)
*Individual task tracking with progress bars and interactive controls*

### Task Management - Dark Theme
![Task Management Dark](Screenshot-247.jpg)
*Dark mode interface for better user experience during extended work sessions*

## 🌟 Project Overview

TeamPulse is a comprehensive team management solution that provides an intuitive interface for tracking team productivity, managing tasks, and monitoring project progress. The application features role-based access (Team Lead/Member), real-time status updates, and a beautiful gradient-based UI with dark/light mode support.

### ✨ Key Features

- **📊 Dashboard Analytics**: Real-time project statistics and team productivity metrics
- **👥 Team Management**: Track team member status (Working, Break, Meeting, Offline) with live updates
- **📋 Task Management**: Assign, track, and update task progress with due dates and interactive controls
- **🔄 Role Switching**: Toggle between Team Lead and Member roles with different permissions
- **🎨 Modern UI**: Gradient-based design with glassmorphism effects and smooth animations
- **🌙 Dark/Light Mode**: Seamless theme switching for better user experience
- **📱 Responsive Design**: Works perfectly across desktop and mobile devices
- **⚡ Interactive Controls**: Progress tracking with +10%, -10%, and Complete buttons
- **🎯 Status Cards**: Visual status indicators with emoji icons and smooth hover effects

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7.1.6
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + Custom CSS with Glassmorphism
- **Development**: JavaScript (ES6+)
- **Package Manager**: npm
- **Deployment**: Vercel (Production) / Netlify Compatible

### 📦 Key Dependencies

{
"react": "^18.x",
"react-dom": "^18.x",
"react-redux": "^8.x",
"@reduxjs/toolkit": "^1.x",
"tailwindcss": "^3.x",
"vite": "^7.x"
}

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. **Clone the repository**
git clone https://github.com/harxhie/TeamPulse-.git
cd TeamPulse-

2. **Install dependencies**
npm install

3. **Start the development server**
npm run dev

4. **Open your browser**
Navigate to `http://localhost:5173` (or the port shown in your terminal)

### 🏗️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📖 Usage Guide

### For Team Members
- **Status Updates**: Click on status cards (Working, Break, Meeting, Offline) to update your current status
- **Task Tracking**: View assigned tasks with due dates and current progress
- **Progress Management**: Use -10%, +10%, and Complete buttons to update task progress
- **Dashboard Navigation**: Access different sections via the sidebar (Dashboard, Calendar, Projects, Tasks, Team, Analytics)

### For Team Leads
- **Team Overview**: Monitor all team members' current status and task progress
- **Task Assignment**: Create and assign new tasks to team members with due dates
- **Progress Monitoring**: Track overall team productivity and individual task completion
- **Role Management**: Switch between Team Lead and Member views

### 🎯 Core Functionality

1. **Status Management**: Real-time status updates with visual feedback
2. **Task Assignment**: Comprehensive task creation with member selection and due dates
3. **Progress Tracking**: Interactive progress controls with instant updates
4. **Role Switching**: Seamless transition between Team Lead and Member interfaces
5. **Theme Toggle**: One-click dark/light mode switching
6. **Responsive Design**: Optimized for all device sizes

## 🌐 Deployment

### Live Application
- **Production URL**: [team-pulse-inky.vercel.app](https://team-pulse-inky.vercel.app/)
- **Deployment Platform**: Vercel
- **Auto-Deploy**: Enabled on every GitHub push

### Deploy Your Own Copy

#### Vercel Deployment (Recommended)
1. Fork this repository
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import your forked repository
4. Vercel will auto-detect Vite and configure:
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
5. Deploy with one click!

#### Netlify Deployment
1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Configure build settings:
- Build command: `npm run build`
- Publish directory: `dist`
3. Deploy automatically

## 📁 Project Structure

TeamPulse/
├── public/
│ ├── vite.svg
│ └── index.html
├── src/
│ ├── App.jsx # Main application component with Redux store
│ ├── main.jsx # Application entry point
│ └── index.css # Global styles and Tailwind imports
├── package.json
├── vite.config.js # Vite configuration with base path
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS configuration
└── README.md

## 🎨 Design Features

- **Glassmorphism Effects**: Transparent cards with backdrop blur and subtle borders
- **Gradient Backgrounds**: Dynamic color gradients that adapt to dark/light themes
- **Smooth Animations**: CSS transitions for hover effects and state changes
- **Status Indicators**: Visual emoji-based status representation
- **Progress Visualization**: Animated progress bars with percentage display
- **Interactive Elements**: Hover effects and button animations
- **Typography**: Gradient text effects for headers and important elements

## 🔧 Configuration

### Vite Configuration
export default defineConfig({
plugins: [react()],
base: './', // Relative paths for deployment compatibility
})

### Key Features in Code
- **Redux Toolkit**: Centralized state management for team data and user roles
- **Role-based Rendering**: Dynamic UI based on current user role
- **Status Management**: Real-time status updates with local state persistence
- **Task Progress**: Interactive progress tracking with increment/decrement controls

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Future Enhancements

- [ ] Real-time notifications system
- [ ] Team chat integration
- [ ] Calendar integration with task deadlines
- [ ] File sharing capabilities
- [ ] Advanced analytics and reporting
- [ ] Mobile app version (React Native)
- [ ] Email notifications for task assignments
- [ ] Time tracking functionality

## 🐛 Known Issues

- Theme preference not persisted across browser sessions
- Progress bar animations may lag on slower devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Harshit** - [@harxhie](https://github.com/harxhie)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Redux Toolkit for simplified state management
- Tailwind CSS for utility-first styling
- Vercel for seamless deployment experience

---

⭐ **If you found this project helpful, please give it a star!** ⭐

**Live Demo:** [team-pulse-inky.vercel.app](https://team-pulse-inky.vercel.app/)

*Happy Coding!* 🚀

---

*Built with ❤️ using React + Vite*

