import {Zone} from "./zone";

export class ControlAcceso
{
  constructor(



  public IDCOMPANY:       string,
  public IDCLIENT:        string,
  public IDZON:           string,
  public RUTVISITA:       string,
  public NOMBREVISITA:    string,
  public MOTIVOVISITA:    string,
  public PATENTEVEHICULO: string,
  public FECHAINGRESO:    string,
  public HORAINGRESO:     string,
  public FECHASALIDA:     string,
  public HORASALIDA:      string,
  public ID:              string,
  public IDUSER:          string,
  public PATENTECARRO:    string,
  public INGRESOPRODUCTO: string,
  public RETIROPRODUCTO:  string,
  public NROGUIA:         string,
  public NROFACTURA:      string,
  public IDFOTOGUIA:      string,
  public IDFOTOFACTURA:   string,
  public IDFOTOPRODUCTO:  string,
  public zona:            Zone,
  ){

  }
}
