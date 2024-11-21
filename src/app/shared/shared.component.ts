import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { navItems } from './sidebar/sidebar-data';
import { NavService } from '../services/nav.service';
import { NavItemComponent } from './sidebar/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { ModalImagenComponent } from '../components/modal-imagen/modal-imagen.component';
import { Store } from '@ngrx/store';
import { LoadingComponent } from './loading/loading.component';
import { LoadingState } from '../store/loading.actions';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';
@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [
    RouterModule,
    NavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    HeaderComponent,
    BreadcrumsComponent,
    ModalImagenComponent,
    LoadingComponent
  ],
  templateUrl: './shared.component.html'
})
export class SharedComponent {

  // navItems = navItems;
  navItems;

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav | any;

  //get options from service
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true; 
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  loading$!: boolean

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private store: Store<{ loading: LoadingState }>, private cdref: ChangeDetectorRef) {
    // console.log(store.subscribe(resp => console.log(resp, "respuesta")))
    // store.select('loading').subscribe(resp => this.loading$ = resp);
    // this.store.select("loading").subscribe(resp => console.log(resp, "respuesta shared"))

    this.htmlElement = document.querySelector('html')!;
    this.htmlElement.classList.add('light-theme');
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes

        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];

        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
      });

      this.navItems = JSON.parse(localStorage.getItem('menu') || "[]") 
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.cdref.detectChanges(); 
    //   this.store.select('loading').pipe(debounceTime(10)).subscribe(resp => {
    //     this.loading$ = resp.cargado;
  
    //   });
    // }, 0)
    // this.cdref.detectChanges();

      this.store.select('loading').pipe(debounceTime(10)).subscribe(resp => {
        console.log("tick")
        this.loading$ = resp.cargado;
      });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
  }

  //
}
