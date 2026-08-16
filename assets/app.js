document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-seen');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach((el) => {
            observer.observe(el);
        });
    }

    // Segmented Scale Bars Animation
    const segmentedBars = document.querySelectorAll('.segmented-bar');
    if (segmentedBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const value = parseInt(bar.getAttribute('data-value'), 10);
                    // Determine how many segments out of 10 to activate
                    const activeCount = Math.round(value / 10);
                    const segments = bar.querySelectorAll('.bar-segment');
                    
                    // Activate segments sequentially
                    segments.forEach((seg, index) => {
                        if (index < activeCount) {
                            setTimeout(() => {
                                seg.classList.add('active');
                            }, index * 100);
                        }
                    });
                    
                    barObserver.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5
        });

        segmentedBars.forEach(b => barObserver.observe(b));
    }
});
