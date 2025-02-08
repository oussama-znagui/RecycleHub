export interface DropOffRequest {
    id: String;
    type_de_dechet: String;
    photos: String[];
    poids_estime: number;
    adresse_de_collecte: String;
    date_creneau: Date;
    notes_supplementaires: String;
    id_particulier: String;
    id_ville: number;
}
