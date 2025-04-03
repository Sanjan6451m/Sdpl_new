import { Component, HostListener, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-home-one',
    templateUrl: './home-one.component.html',
    styleUrls: ['./home-one.component.scss'],
    animations: [
        trigger('circleAnimation', [
            state('small', style({
                transform: 'scale(1) translate(-50%, -50%)',
                opacity: 0.8
            })),
            state('large', style({
                transform: 'scale(2.5) translate(-50%, -50%)',
                opacity: 1
            })),
            transition('small <=> large', animate('800ms cubic-bezier(0.4, 0, 0.2, 1)'))
        ]),
        trigger('statAnimation', [
            state('hidden', style({
                opacity: 0,
                transform: 'translateY(20px)'
            })),
            state('visible', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('hidden => visible', animate('500ms ease-out'))
        ])
    ]
})
export class HomeOneComponent implements OnInit {
    circleState = 'small';
    statState = 'hidden';
    contentVisible = true; // Always keep content visible
    
    stats = [
        { icon: 'bx bx-user', value: '1000+', label: 'Happy Clients' },
        { icon: 'bx bx-check-circle', value: '500+', label: 'Projects Completed' },
        { icon: 'bx bx-award', value: '50+', label: 'Awards Won' },
        { icon: 'bx bx-support', value: '24/7', label: 'Support' }
    ];
    
    private lastScrollTop = 0;
    private scrollThreshold = 5; // Low threshold for responsive animation
    private isWeb = window.innerWidth >= 768;
    private heroHeight: number;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // Calculate hero height
        setTimeout(() => {
            const heroSection = this.el.nativeElement.querySelector('.hero-section');
            if (heroSection) {
                this.heroHeight = heroSection.offsetHeight;
            }
            
            // Initial animation for stats
            this.statState = 'visible';
            
            // Initial animation for circles
            this.circleState = 'small';
        }, 100);

        // Check if web or mobile
        this.isWeb = window.innerWidth >= 768;
        
        // Always make content visible
        this.contentVisible = true;
    }
    
    ngOnDestroy(): void {
        // No event listeners to clean up
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        if (!this.isWeb) return; // Skip animation for mobile

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const logoContainer = this.el.nativeElement.querySelector('.logo-container');
        const circles = this.el.nativeElement.querySelectorAll('.circle');
        
        // If we've scrolled past threshold, expand the circles
        if (scrollTop > this.scrollThreshold) {
            if (this.circleState !== 'large') {
                this.circleState = 'large';
                this.renderer.addClass(logoContainer, 'scrolled');
                
                circles.forEach((circle: HTMLElement) => {
                    this.renderer.addClass(circle, 'scrolled');
                });
            }
        } else if (scrollTop === 0) { // Reset only when back at the very top
            this.circleState = 'small';
            this.renderer.removeClass(logoContainer, 'scrolled');
            
            circles.forEach((circle: HTMLElement) => {
                this.renderer.removeClass(circle, 'scrolled');
            });
        }
        
        this.lastScrollTop = scrollTop;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isWeb = window.innerWidth >= 768;
        
        // Update hero height
        const heroSection = this.el.nativeElement.querySelector('.hero-section');
        if (heroSection) {
            this.heroHeight = heroSection.offsetHeight;
        }
    }

    teamSlides: OwlOptions = {
		loop: true,
        margin: 20,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    }
    clientWrap: OwlOptions = {
		loop:true,
		margin:30,
		nav:false,
		mouseDrag: true,
		items:1,
		dots: false,
		autoHeight: true,
		autoplay: true,
		smartSpeed: 800,
		autoplayHoverPause: true,
		center: false,
		responsive:{
			0:{
				items:1,
				margin: 10,
			},
			576:{
				items:1,
			},
			768:{
				items:2,
				margin: 20,
			},
			992:{
				items:2,
			},
			1200:{
				items:2,
			}
		}
    }

    // Accordion
    accordionItems = [
        {
            title: 'Great Understanding',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sit amet consectetur adipiscing.`,
            open: false
        },
        {
            title: 'Update Technology',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sit amet consectetur adipiscing.`,
            open: false
        },
        {
            title: 'Experienced Team',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sit amet consectetur adipiscing.`,
            open: false
        },
        {
            title: 'Best Quality Service',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sit amet consectetur adipiscing.`,
            open: false
        }
    ];
    selectedItem : any = null;
    toggleAccordionItem(item:any) {
        item.open = !item.open;
        if (this.selectedItem && this.selectedItem !== item) {
            this.selectedItem.open = false;
        }
        this.selectedItem = item;
    }
    
    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }
}