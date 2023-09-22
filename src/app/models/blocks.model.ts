export class Block {

  id: string;
  label: string;
  color: string;

  constructor(id: string, label: string){
    this.id = id;
    this.label = label;
  }
    
}

export class Facial_Expression extends Block {

  description: string;
  id_in_robot: string;
  level: number = 0;

  constructor(id: string = "None", label: string = "None", description: string = "None", id_in_robot: string = "None", level: number = 0){
    super(id, label);
    this.description = description;
    this.id_in_robot = id_in_robot;
    this.level = level;
  }
    
}

export class Body_Gestures extends Block {

  description: string = "";
  id_in_robot: string = "";
  level: number = 0;

  constructor(id: string, label: string, description: string, id_in_robot: string, level: number){
    super(id, label);
    this.description = description;
    this.id_in_robot = id_in_robot;
    this.level = level;
  }
    
}

export class Tone_Voice extends Block {

  description: string = "";
  id_in_robot: string = "";

  constructor(id: string, label: string, description: string, id_in_robot: string){
    super(id, label);
    this.description = description;
    this.id_in_robot = id_in_robot;
  }
    
}

export class Speech extends Block {

  description: string = "";
  id_in_robot: string = "";
  utterance: string = "";

  constructor(id: string, label: string, description: string, id_in_robot: string, utterance: string){
    super(id, label);
    this.description = description;
    this.id_in_robot = id_in_robot;

  }
    
}

export class Routines_Blocks extends Block {

  routine_id: number = 0;

  constructor(id: string, label: string, routine_id: number){
    super(id, label);
    this.routine_id = routine_id;
  }
}