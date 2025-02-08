export class Guardias
{
  constructor(
    public ID:number,
    public IDUSER:string,
    public IDTYPEGUAR:string,
    public DATE:Date|undefined,
    public TIME:Date|undefined,
    public IDPOINT:string,
    public LAT:string,
    public LONG:string,
    public OBSERVATION:string,
    public ISOK:string,
    public IDIMAGE:string,
    public IDCOMPANY:string,
    public IDCLIENT:string,
    public VALIDADO:string
  ){

  }
}
