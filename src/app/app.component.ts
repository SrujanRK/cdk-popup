import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { PopupComponent } from "./popup/popup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [PopupComponent],
})
export class AppComponent {

  @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
  private overlayRef!: OverlayRef;
  isHoveringOverPopup = false;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  showPopup(event: MouseEvent) {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      return;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x: event.clientX, y: event.clientY })
      .withPositions([{ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' }]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
    });

    const popupPortal = new TemplatePortal(this.popupTemplate, this.viewContainerRef);
    this.overlayRef.attach(popupPortal);
  }

  hidePopup() {
    // Only close the popup if not hovering over the popup
    if (this.overlayRef && !this.isHoveringOverPopup) {
      this.overlayRef.detach();
    }
  }

  onPopupMouseEnter() {
    this.isHoveringOverPopup = true;
  }

  onPopupMouseLeave() {
    this.isHoveringOverPopup = false;
    this.hidePopup();
  }
}
