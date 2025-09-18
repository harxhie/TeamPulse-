import React, { useState, useEffect } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Redux Slices
const roleSlice = createSlice({
  name: 'role',
  initialState: {
    currentRole: 'member',
    currentUser: 'Daniel Johnson',
  },
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload;
    },
  },
});

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [
      {
        id: 1,
        name: 'Daniel Johnson',
        status: 'Working',
        avatar: '👨‍💼',
        tasks: [
          { id: 1, title: 'Complete Dashboard', dueDate: '2025-09-25', progress: 60 },
          { id: 2, title: 'Review Code', dueDate: '2025-09-22', progress: 30 },
        ],
      },
      {
        id: 2,
        name: 'Sarah Wilson',
        status: 'Break',
        avatar: '👩‍💻',
        tasks: [
          { id: 3, title: 'Design Mockups', dueDate: '2025-09-24', progress: 80 },
        ],
      },
      {
        id: 3,
        name: 'Mike Chen',
        status: 'Meeting',
        avatar: '👨‍🎨',
        tasks: [
          { id: 4, title: 'Client Call', dueDate: '2025-09-20', progress: 100 },
        ],
      },
    ],
    statusFilter: 'All',
  },
  reducers: {
    updateStatus: (state, action) => {
      const { memberName, status } = action.payload;
      const member = state.members.find(m => m.name === memberName);
      if (member) {
        member.status = status;
      }
    },
    assignTask: (state, action) => {
      const { memberName, task } = action.payload;
      const member = state.members.find(m => m.name === memberName);
      if (member) {
        member.tasks.push({
          id: Date.now(),
          title: task.title,
          dueDate: task.dueDate,
          progress: 0,
        });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberName, taskId, progress } = action.payload;
      const member = state.members.find(m => m.name === memberName);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress));
        }
      }
    },
  },
});

const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: false,
    activeTab: 'Dashboard',
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

// Store
const store = configureStore({
  reducer: {
    role: roleSlice.reducer,
    members: membersSlice.reducer,
    app: appSlice.reducer,
  },
});

const { switchRole } = roleSlice.actions;
const { updateStatus, assignTask, updateTaskProgress } = membersSlice.actions;
const { toggleDarkMode, setActiveTab } = appSlice.actions;

// Dashboard Component with Inline Styles
const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);
  const { members } = useSelector(state => state.members);
  const { darkMode, activeTab } = useSelector(state => state.app);
  const [taskForm, setTaskForm] = useState({ member: '', title: '', dueDate: '' });

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  }, []);

  const currentUserData = members.find(m => m.name === currentUser);
  const navigation = ['Dashboard', 'Calendar', 'Projects', 'Tasks', 'Team', 'Analytics'];

  // Inline Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #1f2937, #374151, #4c1d95, #5b21b6)' 
        : 'linear-gradient(135deg, #f8f6ff, #f3efff, #eedfff, #e9d5ff)',
      color: darkMode ? '#ffffff' : '#374151',
      transition: 'all 0.5s ease',
      display: 'flex',
    },
    
    sidebar: {
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: '280px',
      backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(16px)',
      borderRight: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(139, 92, 246, 0.2)'}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      overflowY: 'auto',
      zIndex: 30,
      padding: '32px',
      boxSizing: 'border-box',
    },
    
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '48px',
    },
    
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: darkMode ? '#ffffff' : '#374151',
    },
    
    navButton: {
      width: '100%',
      textAlign: 'left',
      padding: '16px 24px',
      marginBottom: '8px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
    },
    
    navButtonActive: {
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    
    navButtonInactive: {
      color: darkMode ? '#d1d5db' : '#6b7280',
      backgroundColor: 'transparent',
    },
    
    mainContent: {
      marginLeft: '280px',
      flex: 1,
      minHeight: '100vh',
    },
    
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      padding: '32px 48px',
      backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(139, 92, 246, 0.2)'}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
   headerTitle: {
  fontSize: '36px',
  fontWeight: 'bold',
  marginBottom: '8px',
  // Force background reset first
  background: 'transparent',
  WebkitBackgroundClip: 'initial',
  WebkitTextFillColor: 'initial',
  backgroundClip: 'initial',
  // Then apply gradient
  backgroundImage: darkMode 
    ? 'linear-gradient(135deg, #c084fc, #a855f7)' 
    : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  // Fallback color for browsers that don't support gradient text
  color: darkMode ? '#c084fc' : '#8b5cf6',
  // Force repaint
  transform: 'translateZ(0)',
},

    headerDate: {
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '16px',
    },
    
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    
    searchInput: {
      width: '320px',
      padding: '12px 48px 12px 16px',
      borderRadius: '12px',
      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px)',
      color: darkMode ? '#ffffff' : '#374151',
      fontSize: '16px',
      outline: 'none',
    },
    
    toggleButton: {
      padding: '12px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px)',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'all 0.3s ease',
    },
    
    roleButton: {
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      background: currentRole === 'lead' 
        ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' 
        : 'linear-gradient(135deg, #10b981, #059669)',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
    
    main: {
      padding: '48px',
    },
    
    grid: {
      display: 'grid',
      gap: '32px',
      marginBottom: '48px',
    },
    
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
    },
    
    card: {
      padding: '32px',
      borderRadius: '20px',
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(139, 92, 246, 0.1)'}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
    
    statCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    
    statInfo: {
      flex: 1,
    },
    
    statLabel: {
      fontSize: '14px',
      color: darkMode ? '#d1d5db' : '#6b7280',
      marginBottom: '8px',
      fontWeight: '500',
    },
    
    statValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    
    statChange: {
      fontSize: '14px',
      color: darkMode ? '#9ca3af' : '#6b7280',
    },
    
    statIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      marginLeft: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    
sectionTitle: {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '32px',
  // Use solid colors instead of gradients
  color: darkMode ? '#c084fc' : '#8b5cf6',
  background: 'none',
  WebkitBackgroundClip: 'initial',
  WebkitTextFillColor: 'initial',
  backgroundClip: 'initial',
  transition: 'color 0.3s ease',
},

    
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '24px',
    },
    
    statusButton: {
      padding: '48px 32px',
      borderRadius: '20px',
      border: '2px solid',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    
    statusButtonActive: {
      borderColor: '#8b5cf6',
      backgroundColor: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
      boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
      transform: 'translateY(-2px)',
    },
    
    statusButtonInactive: {
      borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(139, 92, 246, 0.2)',
    },
    
    statusEmoji: {
      fontSize: '48px',
      marginBottom: '16px',
      display: 'block',
    },
    
    statusLabel: {
      fontSize: '18px',
      fontWeight: '600',
    },
    
    taskCard: {
      padding: '32px',
      borderRadius: '16px',
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px)',
      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(139, 92, 246, 0.2)'}`,
      marginBottom: '24px',
      transition: 'all 0.3s ease',
    },
    
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
    },
    
    taskTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: darkMode ? '#ffffff' : '#374151',
      marginBottom: '8px',
    },
    
    taskDate: {
      fontSize: '14px',
      color: darkMode ? '#9ca3af' : '#6b7280',
    },
    
    taskBadge: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
    },
    
    progressBar: {
      width: '100%',
      height: '12px',
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      borderRadius: '6px',
      overflow: 'hidden',
      marginBottom: '24px',
    },
    
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      borderRadius: '6px',
      transition: 'width 0.5s ease',
    },
    
    buttonGroup: {
      display: 'flex',
      gap: '12px',
    },
    
    button: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    
    buttonPrimary: {
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    
    buttonSuccess: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    
    buttonDanger: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
    },
    
    formInput: {
      padding: '12px 16px',
      borderRadius: '8px',
      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px)',
      color: darkMode ? '#ffffff' : '#374151',
      fontSize: '16px',
      outline: 'none',
    },
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (taskForm.member && taskForm.title && taskForm.dueDate) {
      dispatch(assignTask({
        memberName: taskForm.member,
        task: { title: taskForm.title, dueDate: taskForm.dueDate }
      }));
      setTaskForm({ member: '', title: '', dueDate: '' });
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>⚡</div>
          <div style={styles.logoText}>TeamPulse</div>
        </div>
        
        <nav>
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => dispatch(setActiveTab(item))}
              style={{
                ...styles.navButton,
                ...(activeTab === item ? styles.navButtonActive : styles.navButtonInactive),
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <div style={styles.headerTitle}>
              Hello, {currentUser.split(' ')[0]}!
            </div>
            <div style={styles.headerDate}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <input
              type="text"
              placeholder="Search..."
              style={styles.searchInput}
            />
            
            <button
              onClick={() => dispatch(toggleDarkMode())}
              style={styles.toggleButton}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <button
              onClick={() => dispatch(switchRole(currentRole === 'lead' ? 'member' : 'lead'))}
              style={styles.roleButton}
            >
              {currentRole === 'lead' ? '👔 Team Lead' : '👤 Team Member'}
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={styles.main}>
          {currentRole === 'lead' ? (
            // Team Lead View
            <div style={styles.grid}>
              {/* Stats */}
              <div style={styles.statsGrid}>
                <div style={styles.card}>
                  <div style={styles.statCard}>
                    <div style={styles.statInfo}>
                      <div style={styles.statLabel}>Active Projects</div>
                      <div style={{...styles.statValue, color: '#8b5cf6'}}>12</div>
                      <div style={styles.statChange}>
                        <span style={{color: '#10b981'}}>+12%</span> from last month
                      </div>
                    </div>
                    <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
                      📊
                    </div>
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.statCard}>
                    <div style={styles.statInfo}>
                      <div style={styles.statLabel}>Team Members</div>
                      <div style={{...styles.statValue, color: '#10b981'}}>{members.length}</div>
                      <div style={styles.statChange}>
                        <span style={{color: '#10b981'}}>3</span> working now
                      </div>
                    </div>
                    <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                      👥
                    </div>
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.statCard}>
                    <div style={styles.statInfo}>
                      <div style={styles.statLabel}>Total Tasks</div>
                      <div style={{...styles.statValue, color: '#7c3aed'}}>
                        {members.reduce((sum, member) => sum + member.tasks.length, 0)}
                      </div>
                      <div style={styles.statChange}>
                        <span style={{color: '#10b981'}}>5</span> completed
                      </div>
                    </div>
                    <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)'}}>
                      ✅
                    </div>
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.statCard}>
                    <div style={styles.statInfo}>
                      <div style={styles.statLabel}>Productivity</div>
                      <div style={{...styles.statValue, color: '#f59e0b'}}>85%</div>
                      <div style={styles.statChange}>
                        <span style={{color: '#10b981'}}>+5%</span> this week
                      </div>
                    </div>
                    <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
                      🚀
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Overview */}
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Team Overview</h3>
                <div style={styles.statsGrid}>
                  {members.map(member => (
                    <div key={member.id} style={{
                      ...styles.taskCard,
                      padding: '24px',
                    }}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                        }}>
                          {member.avatar}
                        </div>
                        <div style={{flex: 1}}>
                          <div style={{fontWeight: '600', marginBottom: '4px'}}>{member.name}</div>
                          <div style={{
                            ...styles.taskBadge,
                            backgroundColor: member.status === 'Working' ? '#dcfce7' : 
                                           member.status === 'Break' ? '#fef3c7' :
                                           member.status === 'Meeting' ? '#ddd6fe' : '#f3f4f6',
                            color: member.status === 'Working' ? '#166534' : 
                                   member.status === 'Break' ? '#92400e' :
                                   member.status === 'Meeting' ? '#5b21b6' : '#374151',
                          }}>
                            {member.status}
                          </div>
                        </div>
                      </div>
                      <div style={{fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280'}}>
                        Tasks: {member.tasks.length} | Completed: {member.tasks.filter(t => t.progress === 100).length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Assignment */}
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Assign New Task</h3>
                <form onSubmit={handleAssignTask} style={styles.formGrid}>
                  <select
                    value={taskForm.member}
                    onChange={(e) => setTaskForm({...taskForm, member: e.target.value})}
                    required
                    style={styles.formInput}
                  >
                    <option value="">Select Member</option>
                    {members.map(member => (
                      <option key={member.id} value={member.name}>{member.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    required
                    style={styles.formInput}
                  />
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                    required
                    style={styles.formInput}
                  />
                  <button type="submit" style={{...styles.button, ...styles.buttonPrimary}}>
                    Assign Task
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Team Member View
            <div style={styles.grid}>
              {/* Status Update */}
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Update Your Status</h3>
                <div style={styles.statusGrid}>
                  {['Working', 'Break', 'Meeting', 'Offline'].map(status => (
                    <button
                      key={status}
                      onClick={() => dispatch(updateStatus({ memberName: currentUser, status }))}
                      style={{
                        ...styles.statusButton,
                        ...(currentUserData?.status === status ? styles.statusButtonActive : styles.statusButtonInactive),
                        color: currentUserData?.status === status ? '#8b5cf6' : (darkMode ? '#d1d5db' : '#6b7280'),
                      }}
                    >
                      <span style={styles.statusEmoji}>
                        {status === 'Working' ? '💼' :
                         status === 'Break' ? '☕' :
                         status === 'Meeting' ? '👥' : '🔴'}
                      </span>
                      <div style={styles.statusLabel}>{status}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Your Tasks */}
              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Your Tasks ({currentUserData?.tasks.length || 0})</h3>
                {currentUserData?.tasks.length > 0 ? (
                  <div>
                    {currentUserData.tasks.map(task => (
                      <div key={task.id} style={styles.taskCard}>
                        <div style={styles.taskHeader}>
                          <div>
                            <div style={styles.taskTitle}>{task.title}</div>
                            <div style={styles.taskDate}>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                          </div>
                          <div style={{
                            ...styles.taskBadge,
                            backgroundColor: task.progress === 100 ? '#dcfce7' : '#ddd6fe',
                            color: task.progress === 100 ? '#166534' : '#5b21b6',
                          }}>
                            {task.progress === 100 ? 'Completed' : 'In Progress'}
                          </div>
                        </div>
                        
                        <div style={{marginBottom: '16px'}}>
                          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                            <span>Progress</span>
                            <span style={{fontWeight: '600'}}>{task.progress}%</span>
                          </div>
                          <div style={styles.progressBar}>
                            <div 
                              style={{...styles.progressFill, width: `${task.progress}%`}}
                            />
                          </div>
                        </div>
                        
                        {task.progress < 100 && (
                          <div style={styles.buttonGroup}>
                            <button
                              onClick={() => dispatch(updateTaskProgress({
                                memberName: currentUser,
                                taskId: task.id,
                                progress: task.progress - 10
                              }))}
                              disabled={task.progress <= 0}
                              style={{
                                ...styles.button,
                                ...styles.buttonDanger,
                                opacity: task.progress <= 0 ? 0.5 : 1,
                                cursor: task.progress <= 0 ? 'not-allowed' : 'pointer',
                              }}
                            >
                              -10%
                            </button>
                            <button
                              onClick={() => dispatch(updateTaskProgress({
                                memberName: currentUser,
                                taskId: task.id,
                                progress: task.progress + 10
                              }))}
                              disabled={task.progress >= 100}
                              style={{
                                ...styles.button,
                                ...styles.buttonSuccess,
                                opacity: task.progress >= 100 ? 0.5 : 1,
                                cursor: task.progress >= 100 ? 'not-allowed' : 'pointer',
                              }}
                            >
                              +10%
                            </button>
                            <button
                              onClick={() => dispatch(updateTaskProgress({
                                memberName: currentUser,
                                taskId: task.id,
                                progress: 100
                              }))}
                              style={{...styles.button, ...styles.buttonPrimary}}
                            >
                              Complete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{textAlign: 'center', padding: '64px 0'}}>
                    <div style={{fontSize: '64px', marginBottom: '16px'}}>📝</div>
                    <p style={{fontSize: '18px', color: darkMode ? '#d1d5db' : '#6b7280'}}>
                      No tasks assigned yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;
