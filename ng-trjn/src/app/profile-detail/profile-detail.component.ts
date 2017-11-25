import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../common/profile';
import { ProfileService } from '../common/profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  profile: Profile;
  @Output() profileLoaded = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getProfile(this.route.snapshot.paramMap.get('userName'))
      .subscribe(profile => {
        this.profile = profile
        this.profileLoaded.emit(profile.user.id)
      });
  }
}
