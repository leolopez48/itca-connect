import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  searchForm!: FormGroup;
  loading:boolean=false;
  constructor(private fb:FormBuilder){

  }
  ngOnInit(): void {
    
    this.searchForm = this.fb.group({
      id: null,
      searchQuery: ['',[Validators.required]],
    });
  }

  onSubmit(){
    this.loading=true;
    console.log(this.searchForm.value)

      // this.detailPlaceService.Create(this.searchForm.value).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     this.close(true);
      //     this.loading = false;
      //   },
      //   error: (err) => {
      //     console.log(err);
      //     this.loading = false;
      //   }, 
      // });
  }

}
