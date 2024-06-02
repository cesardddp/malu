import json
from typing import List, Literal, Union

from typing import Dict, TypedDict


class LocalizaçãoType(TypedDict):
    label: str
    link: str


# FamíliaType =Union[
#     Dict[Literal['Família'], str] ,
#     Dict[Literal['Localização'], LocalizaçãoType],
#     Dict[str, str]
# ]
FamíliaType = Dict[
    Union[Literal["Família"], Literal["Localização"], str],
    str | LocalizaçãoType | Dict[str, str],
]


json_data: List[FamíliaType] = []

# "Localização": {
#     "label": "22°23'48.3\"S 47°32'48.9\"W",
#     "link": ""
# },
# "exemplares":  {
#         "arquivo": "4.png",
#         "nome": "Tabernamontana laeta Mart.",
#         "tag": "Tabernamontana laeta Mart.",
#         "info": ""
#     }


def addFamília(familia: FamíliaType):
    f = {**familia.copy()}
    
    f.pop("Localização link",'')
    f.pop("Localização",'')
    f.pop("lng",'')
    f.pop("lat",'')
    f.pop("Imagem",'')
    
    f["Localização"] = { # type: ignore
        "label": familia.get("Localização", ""), 
        "link": familia.get("Localização link", ""),
        "coordenadas": {
            "lat":familia.get("lat", ""),
            "lng":familia.get("lng", ""),
        }
    }
    f['exemplares'] = { # type: ignore
        "arquivo": familia.get("Imagem", ""),
        "nome": familia.get("Espécie", ""),
        "tag": familia.get("Espécie", ""),
        "info": familia.get("Espécie", ""),
        "link": familia.get("link", ""),
    }

    json_data.append(f.copy())
    familia.clear()


memoria: FamíliaType = {}
with open("data.txt") as data_file:
    for numeroLinha, line in enumerate(data_file):
        try:
            splited = line.strip().split(":")
            # print(splited)
            if len(splited) < 2:
                continue

            key, value, *rest = splited

            key = key.strip()
            value = value.strip()

            if key == "Família":
                if len(memoria.keys()) > 0:
                    addFamília(memoria)
                    memoria["Família"] = value

            if rest and "https" in value:
                memoria[key] = ":".join([value, *rest]).strip()
                continue
            elif "https" in key:
                memoria['link'] = ":".join([key, value, *rest]).strip()
                continue
            elif rest:
                breakpoint()

            memoria[key] = value

        except ValueError as e:
            if line.strip() == "":
                continue
            print("Error: ", e)
            print("texto linha: ", line)
            print("linha: ", numeroLinha)
            breakpoint()


# manter acentos
json.dump(json_data, open("src/data.json", "w"), ensure_ascii=False, indent=4)
