import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PieceService } from '../service/piece.service';

import { PieceComponent } from './piece.component';

describe('Piece Management Component', () => {
  let comp: PieceComponent;
  let fixture: ComponentFixture<PieceComponent>;
  let service: PieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PieceComponent],
    })
      .overrideTemplate(PieceComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PieceComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PieceService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.pieces?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
