import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, delay, distinctUntilChanged, map } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { BookListService } from './book-list.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  public genre;
  public booklist;
  private bookUrl;
  bookData: any;
  public keyUp = new Subject<KeyboardEvent>();
  public subscribeInput = new Subscription;
  public showLoader: boolean = true;
  public noData: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private bookListService: BookListService
  ) {

    this.subscribeInput = this.keyUp
      .pipe(
        map((ev: any) => ev.target.value),
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((val) => {
        console.log(this.bookUrl);
        this.booklist = [];
        this.getBookList(this.bookUrl + '&search=' + val.replace(' ', '%20'));
      }
      );

  }



  ngOnInit(): void {
    this.genre = this.route.snapshot.paramMap.get('genre');
    this.bookUrl = 'http://gutendex.com/books/?mime_type=image&topic=' + this.genre;
    this.getBookList(this.bookUrl);

  }
  ngOnDestroy(): void {
    this.subscribeInput.unsubscribe();
  }


  public getBookList(Url) {
    this.showLoader = true;
    this.bookListService.getBookList(Url).subscribe((data: any) => {
      this.bookData = data;
      this.booklist = this.booklist ? [...this.booklist, ...this.bookData.results] : this.bookData.results;
      console.log(this.bookData, Url);
      this.noData = this.booklist.length<=0;
    },
    (err)=> {},
    ()=> {
      this.showLoader = false;
    }
    )
  }

  public redirectToParent() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }


  @HostListener('scroll', ['$event'])
  public onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.scrollTop>0 && event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if (this.bookData.next) {
        // this.bookUrl = this.bookData.next;
        this.getBookList(this.bookData.next);
      }
    }
  }

  openBookPreview(formats)
  { 
    const url = formats[Object.keys(formats).find((el)=> el.startsWith('text'))];
    const newUrl = (url.search('.zip')!== -1) ? ((url + url.substring(url.lastIndexOf('/'))).replace(/.zip/gi,'').replace(/-[0-9]/g,'-h') + '.htm') : url;
    window.open(newUrl,"_self");
  }

}
