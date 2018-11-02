import { Component, OnInit } from '@angular/core';
import { WmApiService } from './wm-api.service';
import { BadgeService } from './badge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WmApiService, BadgeService]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _wmapi: WmApiService) { }

  userProfile: any;
  userAvatar: string;
  xpCalc: number;
  leaderboardPos: number;

  ngOnInit() {
    this.getUserProfile();
  }

  // Fill the user profile information
  getUserProfile() {
    console.log("Logged in user:" + this._wmapi.tempuser);
    this._wmapi
    .getService("User/" + this._wmapi.tempuser)
    .then((result) => {
      // Calculate the user XP
      this.calculateXP(result.UserLevel, result.UserXp);
      // Push the user to UI
      this.getGlobalLeaderboardPos(result.Username);
      this.userProfile = result;
      // Set the user avatar
      this.userAvatar = this._wmapi.tempuseravatar; 
    })
    .catch(error => console.log(error));
  }

  // Calculate XP Percent for progres bar
  calculateXP(level: number, userxp: number) {
    this._wmapi
    .getService("Level/" + (level + 1))
    .then((result) => {
      this.xpCalc = (userxp / result.UserXp) * 100
    })
    .catch(error => console.log(error)); 
  }

  // Get Users Leaderboard Position
  getGlobalLeaderboardPos(username: string) {
    this._wmapi
    .getService("User/Leaderboard/Position/" + username)
    .then((result) => {
      this.leaderboardPos = result;
    })
    .catch(error => console.log(error)); 
  }
  
}
