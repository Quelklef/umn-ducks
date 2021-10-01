
/*

  { kind :: "duck born"
  , since :: Date
  , name :: String
  , id :: String
  }

  { kind :: "duck found"
  , since :: Date
  , id :: String
  , by :: String
  , href :: String
  }

  { kind :: "duck hidden"
  , since :: Date
  , id :: String
  , by :: String
  , href :: String
  , hint :: String
  }

*/

function mkBorn(whenStr, name, id) {
  return { kind: "duck born", since: new Date(whenStr), name, id };
}

function mkTime(date, time, tz) {
  return `${date}T${time}${tz}`;
}

// minneapolis time zone
const tz_mn = '-05:00';


exports.default =
{
  events: [

mkBorn( mkTime('2021-09-30', '19:17:04', tz_mn), 'Maristella', '457' ),
mkBorn( mkTime('2021-09-30', '19:17:03', tz_mn), 'Martin'    , '386' ),
mkBorn( mkTime('2021-09-30', '19:17:02', tz_mn), 'Zdenka'    , '111' ),
mkBorn( mkTime('2021-09-30', '19:17:01', tz_mn), 'Edythe'    , '200' ),
mkBorn( mkTime('2021-09-30', '19:17:00', tz_mn), 'Njord'     , '698' ),

// Fearghal    #814
// Hildræd     #819
// Javor       #122
// Frans       #088
// Ulrica      #190
// Tal         #973
// Hamo        #908
// Tabitha     #434
// Mathias     #368
// Tjeerd      #408
// Diya        #226
// Henryk      #777
// Godofredo   #199
// Suero       #967
// Themba      #109
// Thabani     #760
// Lėja        #397
// Walchelin   #009
// Bayani      #439
// Shirin      #220
// Blanche     #641
// Abdülhamit  #635
// Yehiel      #120
// Leofwine    #219
// Bharat      #150
// Trajan      #052
// Gulrukh     #978
// Noemi       #119
// Walter      #869
// Domitianus  #059
// Sylvaine    #818
// Goma        #502
// Olamilekan  #414
// Bohdan      #776
// Erika       #796
// Leigong     #223
// Kevork      #166
// Aloysius    #191
// Ayanda      #949
// Raimo       #637
// Olivia      #744
// Desideria   #481
// Simon       #487
// Abhay       #566
// Bróðir      #844
// Isabella    #465
// Soterios    #564
// Gilbert     #228
// Dilşad      #388
// Rajiv       #924
// Aristides   #853
// Diyar       #460
// Cadfan      #735
// Homeros     #581
// Girisha     #431
// Livianus    #371
// Lalitha     #186
// Ji-Hye      #713
// Maximilian  #681
// Iúile       #707
// Saif al-Din #243
// Loís        #647
// José        #661
// Antipatros  #351
// Horácio     #882
// Hirsh       #938
// Līva        #634
// Hilda       #687
// Caesonius   #673
// Axel        #660
// Lea         #415
// Raju        #105
// Qays        #093
// Shahriar    #011
// Miroslava   #291
// Albin       #358
// Enki        #572
// Maud        #552
// Eulália     #231
// Valeriy     #167
// Clopas      #312
// Mahamadou   #663
// Samanta     #880
// Satish      #657
// Mehr        #598
// Roldán      #820
// Hartwig     #400
// Naveen      #588
// Muiredach   #636
// Monet       #366
// Rajendra    #217
// Gunnbjǫrg   #409
// Hienadz     #583
// Milo        #916
// Linus       #666

  ]
}
