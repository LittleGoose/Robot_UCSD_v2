import { ViewRef } from "@angular/core";

export class TabData { //Tabs model? I'm not sure it's necessary
    tabName: string;
    dataInfo: string;
    hostView: ViewRef;
    tabId: string;
  
    constructor(tabName: string = "tab name", 
                dataInfo: string = "dummy data", id: string = "idDummy") {
      this.tabName = tabName;
      this.dataInfo = dataInfo;
      this.tabId = id;
    }
}