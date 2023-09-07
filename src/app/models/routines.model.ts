interface send_block {
    name: string;
    level: number;
    talk: string;
};

export class Routines {

    id: number = 0;
    name: string = "";
    array_block: Array<Array<send_block>> = [];
      
  }