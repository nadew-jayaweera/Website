/**
 * Blog Specific Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.getElementById('blog-search');
    const posts = document.querySelectorAll('.blog-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            posts.forEach(post => {
                const title = post.querySelector('.post-title').innerText.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').innerText.toLowerCase();
                const category = post.dataset.category.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Category Filtering
    const categoryBtns = document.querySelectorAll('.cat-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            posts.forEach(post => {
                if (filterValue === 'all' || post.dataset.category === filterValue) {
                    post.style.display = 'block';
                    // Add animation
                    post.style.animation = 'fadeIn 0.5s ease';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Newsletter Form (Prevent Default)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Subscribed!';
            btn.style.background = '#10b981';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    });
});