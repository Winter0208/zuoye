// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setupNavigation();
    setupLoginForm();
    setupMusicItems();
    setupSocialLogin();
    updateCopyrightYear();
    
    // 添加滚动效果
    window.addEventListener('scroll', handleScroll);
});

// 创建星星装饰
function createStars() {
    const header = document.querySelector('header');
    for(let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✦';
        star.style.position = 'absolute';
        star.style.color = 'rgba(255, 255, 255, 0.7)';
        star.style.fontSize = Math.random() * 20 + 10 + 'px';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
        star.style.pointerEvents = 'none';
        star.style.zIndex = '1';
        header.appendChild(star);
    }
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

// 设置导航栏交互
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动的链接
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // 添加当前活动链接
            this.classList.add('active');
            
            // 滚动到对应部分
            const targetId = this.getAttribute('href').substring(1);
            if(targetId) {
                const targetElement = document.getElementById(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            } else {
                // 如果是首页链接，滚动到顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 设置登录表单交互
function setupLoginForm() {
    const loginBtn = document.getElementById('login-btn');
    const getVerificationBtn = document.getElementById('get-verification');
    
    // 登录按钮事件
    loginBtn.addEventListener('click', function() {
        const nickname = document.getElementById('nickname').value;
        const phone = document.getElementById('phone').value;
        const favoriteSong = document.getElementById('favorite-song').value;
        
        if(!nickname || !phone || !favoriteSong) {
            showNotification('请填写完整的登录信息！', 'error');
            return;
        }
        
        // 模拟登录成功
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
        this.disabled = true;
        
        setTimeout(() => {
            const songText = document.getElementById('favorite-song').options[document.getElementById('favorite-song').selectedIndex].text;
            showNotification(`登录成功！欢迎回来，${nickname}！您最喜欢的歌曲是：${songText}`, 'success');
            
            this.innerHTML = '登录 MY会员';
            this.disabled = false;
            
            // 清空表单
            document.getElementById('nickname').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('verification').value = '';
            document.getElementById('password').value = '';
            document.getElementById('favorite-song').value = '';
        }, 1500);
    });
    
    // 获取验证码按钮事件
    getVerificationBtn.addEventListener('click', function() {
        const phone = document.getElementById('phone').value;
        
        if(!phone || phone.length !== 11) {
            showNotification('请输入有效的手机号码！', 'error');
            return;
        }
        
        // 模拟发送验证码
        this.innerHTML = '发送中...';
        this.disabled = true;
        
        let countdown = 60;
        const originalText = this.innerHTML;
        
        const timer = setInterval(() => {
            this.innerHTML = `${countdown}秒后重试`;
            countdown--;
            
            if(countdown < 0) {
                clearInterval(timer);
                this.innerHTML = originalText;
                this.disabled = false;
            }
        }, 1000);
        
        showNotification('验证码已发送到您的手机，请注意查收！', 'success');
    });
}

// 设置音乐项目交互
function setupMusicItems() {
    const musicItems = document.querySelectorAll('.music-item');
    
    musicItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.music-icon i');
            if(icon) {
                icon.classList.remove('fa-play', 'fa-film');
                icon.classList.add('fa-volume-up');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.music-icon i');
            if(icon) {
                icon.classList.remove('fa-volume-up');
                
                // 根据父元素判断是音乐还是MV
                const parentSection = this.closest('section');
                if(parentSection && parentSection.querySelector('.card-title i').classList.contains('fa-video')) {
                    icon.classList.add('fa-film');
                } else {
                    icon.classList.add('fa-play');
                }
            }
        });
        
        // 点击播放效果
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`正在播放: ${title}`, 'info');
        });
    });
}

// 设置社交登录按钮
function setupSocialLogin() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('weibo') ? '微博' : '小红书';
            showNotification(`正在通过${platform}登录...`, 'info');
            
            // 模拟登录过程
            setTimeout(() => {
                showNotification(`${platform}登录成功！`, 'success');
            }, 1000);
        });
    });
}

// 更新版权年份
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('footer p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        if(el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', currentYear);
        }
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新的通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '10px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    notification.style.transform = 'translateX(120%)';
    notification.style.transition = 'transform 0.3s ease';
    
    // 根据类型设置背景色
    if(type === 'success') {
        notification.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
    } else if(type === 'error') {
        notification.style.background = 'linear-gradient(to right, #F44336, #FF9800)';
    } else {
        notification.style.background = 'linear-gradient(to right, var(--primary-pink), var(--purple))';
    }
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 3秒后隐藏通知
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        
        // 动画结束后移除元素
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 处理滚动事件
function handleScroll() {
    // 添加导航栏滚动效果
    const header = document.querySelector('header');
    if(window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(255, 158, 216, 0.4)';
        header.style.padding = '15px 0';
    } else {
        header.style.boxShadow = '0 8px 25px rgba(255, 158, 216, 0.3)';
        header.style.padding = '25px 0';
    }
    
    // 高亮当前部分对应的导航链接
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // 如果滚动到顶部，激活首页链接
    if(window.scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    }
}

// 添加卡片悬停效果增强
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cardTitle = this.querySelector('.card-title');
            if(cardTitle) {
                cardTitle.style.transform = 'translateX(5px)';
                cardTitle.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cardTitle = this.querySelector('.card-title');
            if(cardTitle) {
                cardTitle.style.transform = 'translateX(0)';
            }
        });
    });
});