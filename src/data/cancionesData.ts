export type Cancion = {
  nombre: string;
  url: string;
  artistas: string[];
};

const BASE_URL = import.meta.env.VITE_S3_BUCKET_URL || "https://flowin-20.s3.us-east-1.amazonaws.com/songs";

export const cancionesData: Record<string, { url: string; artistas: string[] }> = {
  "Symphony No. 5": { url: `${BASE_URL}/clasica/ludwig_van_beethoven_symphony_no_5_op_67.mp3`, artistas: ["Ludwig van Beethoven"] },
  "Pequena Serenata Nocturna": { url: `${BASE_URL}/clasica/pequena_serenata_nocturna_mozart.mp3`, artistas: ["Wolfgang Amadeus Mozart"] },

  "Missin You Like This": { url: `${BASE_URL}/country/post_malone_missin_you_like_this.mp3`, artistas: ["Post Malone"] },
  "What Dont Belong To Me": { url: `${BASE_URL}/country/post_malone_what_dont_belong_to_me.mp3`, artistas: ["Post Malone"] },

  "The Nights": { url: `${BASE_URL}/electronica/avicii_the_nights.mp3`, artistas: ["Avicii"] },
  "Waiting For Love": { url: `${BASE_URL}/electronica/avicii_waiting_for_love.mp3`, artistas: ["Avicii"] },
  "Party Rock Anthem": { url: `${BASE_URL}/electronica/lmfao_party_rock_anthem_ft_lauren_bennett_goonrock.mp3`, artistas: ["LMFAO"] },
  "Sorry For Party Rock": { url: `${BASE_URL}/electronica/lmfao_sorry_for_party_rocking.mp3`, artistas: ["LMFAO"] },

  "Algo Contigo": { url: `${BASE_URL}/jazz/algo_contigo.mp3`, artistas: ["Varios"] },
  "Take Five": { url: `${BASE_URL}/jazz/dave_brubeck_the_dave_brubeck_quartet_take_five.mp3`, artistas: ["Dave Brubeck"] },
  "What A Wonderful World": { url: `${BASE_URL}/jazz/louis_armstrong_what_a_wonderful_world.mp3`, artistas: ["Louis Armstrong"] },
  "My One And Only Love": { url: `${BASE_URL}/jazz/mon_laferte_natalia_lafourcade_silvana_estrada_my_one_and_only_love.mp3`, artistas: ["Mon Laferte", "Natalia Lafourcade"] },

  "Piel Canela": { url: `${BASE_URL}/latina/cuco_piel_canela.mp3`, artistas: ["Cuco"] },
  "Limbo": { url: `${BASE_URL}/latina/daddy_yankee_limbo.mp3`, artistas: ["Daddy Yankee"] },
  "La Que Me Gusta": { url: `${BASE_URL}/latina/los_amigos_invisibles_la_que_me_gusta_letra.mp3`, artistas: ["Los Amigos Invisibles"] },
  "Primaveral": { url: `${BASE_URL}/latina/mon_laferte_primaveral.mp3`, artistas: ["Mon Laferte"] },
  "Ingles En Miami": { url: `${BASE_URL}/latina/rawayana_manuel_turizo_ingles_en_miami.mp3`, artistas: ["Rawayana", "Manuel Turizo"] },

  "Enter Sandman": { url: `${BASE_URL}/metal/enter_sandman.mp3`, artistas: ["Metallica"] },
  "For Whom The Bell Tolls": { url: `${BASE_URL}/metal/for_whom_the_bell_tolls.mp3`, artistas: ["Metallica"] },
  "Master Of Puppets": { url: `${BASE_URL}/metal/master_of_puppets.mp3`, artistas: ["Metallica"] },
  "Wherever I May Roam": { url: `${BASE_URL}/metal/wherever_i_may_roam.mp3`, artistas: ["Metallica"] },

  "Again": { url: `${BASE_URL}/pop/again_op_1_subtitulado_al_espanol_fullmetal_alchemist_brotherhood.mp3`, artistas: ["YUI"] },
  "Reina Pepiada": { url: `${BASE_URL}/pop/alvaro_diaz_reina_pepiada.mp3`, artistas: ["Alvaro Diaz"] },
  "Nino Amor": { url: `${BASE_URL}/pop/axel_fiks_nino_amor.mp3`, artistas: ["Axel Fiks"] },
  "Billie Jean": { url: `${BASE_URL}/pop/billie_jean.mp3`, artistas: ["Michael Jackson"] },
  "Todo Cambio": { url: `${BASE_URL}/pop/camila_todo_cambio.mp3`, artistas: ["Camila"] },
  "Corazon": { url: `${BASE_URL}/pop/danny_ocean_corazon.mp3`, artistas: ["Danny Ocean"] },
  "Only": { url: `${BASE_URL}/pop/leehi_only.mp3`, artistas: ["Leehi"] },
  "The Shade": { url: `${BASE_URL}/pop/rex_orange_county_the_shade.mp3`, artistas: ["Rex Orange County"] },
  "I Will Survive": { url: `${BASE_URL}/pop/i_will_survive.mp3`, artistas: ["Demi Lovato"] },

  "TNT": { url: `${BASE_URL}/rock/acdc_t_n_t.mp3`, artistas: ["AC/DC"] },
  "Enamorado Tuyo": { url: `${BASE_URL}/rock/el_cuarteto_de_nos_enamorado_tuyo.mp3`, artistas: ["El Cuarteto De Nos"] },
  "Bohemian Rhapsody": { url: `${BASE_URL}/rock/queen_bohemian_rhapsody.mp3`, artistas: ["Queen"] },
  "Don't Stop Me Now": { url: `${BASE_URL}/rock/queen_don_t_stop_me_now.mp3`, artistas: ["Queen"] },
  "Can't Stop": { url: `${BASE_URL}/rock/red_hot_chili_peppers_can_t_stop.mp3`, artistas: ["Red Hot Chili Peppers"] },
  "Under The Bridge": { url: `${BASE_URL}/rock/red_hot_chili_peppers_under_the_bridge.mp3`, artistas: ["Red Hot Chili Peppers"] },
  "Dani California": { url: `${BASE_URL}/rock/redhotchilipeppers_dani_california.mp3`, artistas: ["Red Hot Chili Peppers"] },

  "Lloraras": { url: `${BASE_URL}/salsa/lloraras.mp3`, artistas: ["Oscar D'León"] },
  "Tu y Yo": { url: `${BASE_URL}/salsa/tu_y_yo_la_misma_gente_lyric_video.mp3`, artistas: ["La Misma Gente"] },

  "Out West": { url: `${BASE_URL}/trap/jackboys_travis_scott_out_west_ft_young_thug.mp3`, artistas: ["Travis Scott", "JACKBOYS"] },
  "Bajo de la Piel": { url: `${BASE_URL}/trap/milo_j_bajo_de_la_piel.mp3`, artistas: ["Milo J"] },
  "Nino": { url: `${BASE_URL}/trap/milo_j_nino.mp3`, artistas: ["Milo J"] },
  "Goosebumps": { url: `${BASE_URL}/trap/travis_scott_goosebumps_ft_kendrick_lamar.mp3`, artistas: ["Travis Scott"] }
};