import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLUGINS_ENVIRONNEMENT } from '../../features-plugins.module';
import { PluginsPageComponent } from '../plugins-page/plugins-page.component';

describe('PluginsPageComponent', () => {
  let component: PluginsPageComponent;
  let fixture: ComponentFixture<PluginsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluginsPageComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: PLUGINS_ENVIRONNEMENT,
          useValue: '',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PluginsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
