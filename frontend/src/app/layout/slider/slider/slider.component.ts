import { Component, OnInit, AfterViewChecked } from '@angular/core';
import $, { speed } from 'jquery';
import 'slick-carousel/slick/slick';
import { SliderService } from './slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, AfterViewChecked {
  vagas: any[] = [];
  isSliderInitialized = false;

  constructor(private sliderService: SliderService) {}

  ngOnInit() {
    this.sliderService.getVagas().subscribe((data: any[]) => {
      this.vagas = data;
    });
  }

  ngAfterViewChecked() {
    if (this.vagas.length > 0 && !this.isSliderInitialized) {
      this.initializeSlider();
    }
  }

  initializeSlider() {
    const sliderElement = $('.slider');
    if (sliderElement.length) {
      (sliderElement as any).slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        Infinity:false,
        speed:300,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint:400,
            settings:{
              slidesToShow:1,
              slidesToScroll:1
            }
          }
        ]
      });
      this.isSliderInitialized = true;
    }
  }

}
