export class Block { // In sidebar

  id: string;
  label: string;
  color: string;
  description: string = "";

  constructor(id: string, label: string, description: string){
    this.id = id;
    this.label = label;
    this.description = description;
  }
    
}

export class Facial_Expression extends Block {

  id_in_robot: string;
  level: number = 0;

  constructor(id: string = "None", label: string = "None", description: string = "None", id_in_robot: string = "None", level: number = 0){
    super(id, label, description);
    this.description = description;
    this.id_in_robot = id_in_robot;
    this.level = level;
  }
    
}

export class Body_Gestures extends Block {

  id_in_robot: string = "";
  level: number = 0;

  constructor(id: string, label: string, description: string, id_in_robot: string, level: number){
    super(id, label, description);
    this.description = description;
    this.id_in_robot = id_in_robot;
    this.level = level;
  }
    
}

export class Tone_Voice extends Block {

  id_in_robot: string = "";

  constructor(id: string, label: string, description: string, id_in_robot: string){
    super(id, label, description);
    this.description = description;
    this.id_in_robot = id_in_robot;
  }
    
}

export class Speech extends Block {

  id_in_robot: string = "";
  utterance: string = "";

  constructor(id: string, label: string, description: string, id_in_robot: string, utterance: string){
    super(id, label, description);
    this.id_in_robot = id_in_robot;
    this.utterance = utterance
  }
    
}

export class Routines_Blocks extends Block {

  constructor(id: string, label: string, description:string){
    super(id, label, description);
  }
}