import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { TeamComponent } from './components/pages/team/team.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { ServiceComponent } from './components/pages/service/service.component';
import { ItServicesComponent } from './components/pages/it-services/it-services.component';
import { MobilityComponent } from './components/pages/mobility/mobility.component';
import { MdmComponent } from './components/pages/mdm/mdm.component';
import { DevicesComponent } from './components/pages/devices/devices.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { EventsComponent } from './components/pages/events/events.component';
import { OurApproachComponent } from './components/pages/our-approach/our-approach.component';
import { SuperiorStoryComponent } from './components/pages/superior-story/superior-story.component';
import { CloudSolutionsComponent } from './components/pages/cloud-solutions/cloud-solutions.component';
import { LeasingComponent } from './components/pages/leasing/leasing.component';
import { NetworkingComponent } from './components/pages/networking/networking.component';
import { AudiovideoSolutionsComponent } from './components/pages/audiovideo-solutions/audiovideo-solutions.component';
import { ItConsultingComponent } from './components/pages/it-consulting/it-consulting.component';
import { TrainingComponent } from './components/pages/training/training.component';
import { RepairComponent } from './components/pages/repair/repair.component';
import { DeploymentComponent } from './components/pages/deployment/deployment.component';
import { HardwareComponent } from './components/pages/hardware/hardware.component';
import { SoftwareComponent } from './components/pages/software/software.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { ContactFormComponent } from './components/pages/contact-form/contact-form.component';

const routes: Routes = [
    {path: 'home-one', component: HomeOneComponent},
    {path: '', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'team', component: TeamComponent},
    {path: 'gallery', component: GalleryComponent},
    {path: 'testimonials', component: TestimonialsComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'terms-condition', component: TermsConditionsComponent},
    {path: 'service', component: ServiceComponent},
    {path: 'it-services', component: ItServicesComponent},
    {path: 'mobility', component: MobilityComponent},
    {path: 'mdm', component: MdmComponent},
    {path: 'devices', component: DevicesComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'events', component: EventsComponent},
    {path: 'our-approach', component: OurApproachComponent},
    {path: 'superior-story', component: SuperiorStoryComponent},
    {path: 'cloud-solutions', component: CloudSolutionsComponent},
    {path: 'leasing', component: LeasingComponent},
    {path: 'networking', component: NetworkingComponent},
    {path: 'audiovideo-solutions', component: AudiovideoSolutionsComponent},
    {path: 'it-consulting', component: ItConsultingComponent},
    {path: 'training', component: TrainingComponent},
    {path: 'repair', component: RepairComponent},
    {path: 'deployment', component: DeploymentComponent},
    {path: 'hardware', component: HardwareComponent},
    {path: 'software', component: SoftwareComponent},
    {path: 'dummy-page', component: DummyPageComponent},
    {path: 'contact-form', component: ContactFormComponent},

    // Here add new pages component

    {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', })],
    exports: [RouterModule]
})
export class AppRoutingModule { }