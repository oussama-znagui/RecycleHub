export interface DropOffRequest {
    id: String;
    
    dechets: [
        {
          type_de_dechet: String,
          poids_estime: number
        }
      ],
    photos: String[];
    adresse_de_collecte: String;
    date_creneau: Date;
    notes_supplementaires: String;
    id_particulier: String;
    id_ville: number;
    status: String
}
