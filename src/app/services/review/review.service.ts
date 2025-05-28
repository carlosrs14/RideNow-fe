import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Review } from '../../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private urlReview = environment.apiUrl + 'microservicio_reviews_RN/VReviewServlet'

  constructor(private http: HttpClient) {}

}
