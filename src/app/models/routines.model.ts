export class Send_block {
    name: string = "";
    class: string = "";
    level: number = 0;
    talk: string = "";
    clear: string= "";
  
    get_color(){
        
        let color: string;

        switch(this.class){
            case "facial_expression":
              color = "success";
              break;
          
            case "speech":
              color = "warning";
              break;
          
            case "routine":
              color = "medium";
              break;

            case "tone_of_voice":
              color = "tertiary";
              break;

            case "body_gesture":
              color = "danger";
              break;
          
            default:
              color = "red";
          }
        return color;
    }
};

export class Routines {

    id: string = "0";
    name: string = "";
    array_block: Array<Array<Send_block>> = [];
      
  }