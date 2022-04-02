import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ServicesComponent } from "./services/services.component";

const routes: Routes = [
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'about', component: AboutComponent
    },
    {
        path: 'services', component: ServicesComponent
    },
    {
        path: 'gallery', component: GalleryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }