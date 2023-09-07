export class Block {

  id: number = 0;
  label: string = "";
    
}

export class Facial_Expression extends Block {

  description: string = "";
  id_in_robot: string = "";
  level: number = 0;
    
}

export class Body_Gestures extends Block {

  description: string = "";
  id_in_robot: string = "";
  level: number = 0;
    
}

export class Tone_Voice extends Block {

  description: string = "";
  id_in_robot: string = "";
    
}

export class Speech extends Block {

  description: string = "";
  id_in_robot: string = "";
  utterance: string = "";
    
}

export class Routines_Blocks extends Block {

  routine_id: number = 0;
}