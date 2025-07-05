export type Cancion = {
  nombre: string;
  url: string;
  artistas: string[];
};

export const cancionesData: Record<string, { url: string; artistas: string[] }> = {
  "Bohemian Rhapsody": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/queen/bohemianRapsody.mp3",
    artistas: ["Queen"],
  },
  "TNT": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/acdc/TNT.mp3",
    artistas: ["AC/DC"],
  },
  "Cant Stop": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/rhcp/cantStop.mp3",
    artistas: ["Red Hot Chili Peppers"],
  },
  "Missin You Like This": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/country/postMalone/missinYouLikeThis.mp3",
    artistas: ["Post Malone"],
  },
  "What Dont Belong To Me": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/country/postMalone/whatDontBelongToMe.mp3",
    artistas: ["Post Malone"],
  },
  "Ludwig No5 Op67": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/clasica/beethoven/ludwingNo5Op67.mp3",
    artistas: ["Ludwig van Beethoven"],
  },
  "Pequena Serenata Nocturna": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/clasica/mozart/peque%C3%B1aSerenataNocturna.mp3",
    artistas: ["Wolfgang Amadeus Mozart"],
  },
  "The Nights": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/avicii/theNights.mp3",
    artistas: ["Avicii"],
  },
  "Waiting For Love": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/avicii/waitingForLove.mp3",
    artistas: ["Avicii"],
  },
  "Party Rock Anthem": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/lmfao/electronica_lmfao_partyRockAnthem.mp3",
    artistas: ["LMFAO"],
  },
  "Sorry For Party Rock": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/lmfao/electronica_lmfao_sorryForPartyRockk.mp3",
    artistas: ["LMFAO"],
  },
  "Take Five": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/jazz/daveBrubeck/jazz_daveBrubeck_takeFive.mp3",
    artistas: ["Dave Brubeck"],
  },
  "What A Wonderful World": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/jazz/louisArmstrong/jazz_louisArmstrong_whatAWonderfulWorld.mp3",
    artistas: ["Louis Armstrong"],
  },
  "Limbo": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/latina/daddyYankee/latina_daddyYankee_Limbo.mp3",
    artistas: ["Daddy Yankee"],
  },
  "Enter Sandman": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/enterSandman.mp3",
    artistas: ["Metallica"],
  },
  "Master Of Puppets": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/masteroffpuppets.mp3",
    artistas: ["Metallica"],
  },
  "Wherever I May Roam": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/whereverIMayRoam.mp3",
    artistas: ["Metallica"],
  },
  "Judas": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/pop/ladyGaga/judas.mp3",
    artistas: ["Lady Gaga"],
  },
  "Billie Jean": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/pop/michaelJackson/billieJean.mp3",
    artistas: ["Michael Jackson"],
  },
  "Lloraras": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/salsa/dLeon/Lloraras.mp3",
    artistas: ["Oscar D'León"],
  },
  "Goosebumps": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/trap/trap_travisScott_goosebumps.mp3",
    artistas: ["Travis Scott"],
  },
  "Out West": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/trap/trap_travisScottANDjackboys_outwest.mp3",
    artistas: ["Travis Scott", "JACKBOYS"],
  },
};