import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsItem } from 'src/app/domain/interfaces/good.interface';
import { GoodsTableContainerComponent } from './goods-table-container.component';
import { Observable, from, of } from 'rxjs';
import { componentFactoryName } from '@angular/compiler';

interface TableContainerConfig {
  isError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  goodsList: GoodsItem[];
  filter: string;
}

function configureComponent(config: TableContainerConfig, component) {
  const { isError$, isLoading$, goodsList, filter } = config;
  component.isError$ = isError$;
  component.isLoading$ = isLoading$;
  component.goodsList = goodsList;
  component.filter = filter;
}

describe('GoodsTableContainerComponent', () => {
  let component: GoodsTableContainerComponent;
  let fixture: ComponentFixture<GoodsTableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsTableContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('', () => {
    const config = {
      isError$: of(false),
      isLoading$: of(true),
      goodsList: [],
      filter: ''
    };

    configureComponent(config, component);
  });
});
