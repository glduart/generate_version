interface CreateTimeDTO {
    time: string;
    version?: string;
}

interface IDB {
    time: string;
    version: string;
    childs: IDB[];
}


let db: IDB[] = [{
    time: "12-4-5",
    version: "1.0",
    childs: [
        {
            time: "1-1-1",
            version: "1.1",
            childs: [{
              time: "1-1-1",
                version: "1.1.1",
                childs: []
            }]
        },
        {
            time: "1-1-1",
            version: "1.2",
            childs: []
        }
        
   ]
}];

function generateNewVersion() { 
    const lastRegister = db[db.length - 1];

    const [firstDigit, _] = lastRegister.version.split(".");

    return `${Number(firstDigit) + 1}.0`;
}

function findLastChildByVersion(v: string, t: IDB[]): IDB | undefined {
    for (let r of t) {
        if (r.version === v) {
            return (r.childs.length === 0) ? undefined : r.childs[r.childs.length - 1];
        }
        const result = findLastChildByVersion(v, r.childs);
        if (result) {
            return result;
        }
    }
    return undefined;
}

class CreateTimeController {
    handle({ time, version }: CreateTimeDTO) {
       if (!version) {
        const newVersion = generateNewVersion(); 
            console.log({time, newVersion});
        return;
       }
        const lasDigit = version[version.length -1];
        const lastChild = findLastChildByVersion(version, db); 

        const lastDigitChild = (!lastChild) ? 0 : lastChild.version[version.length - 1];
        
        const rest = version.slice(0, lasDigit === "0" ? version.length - 2 : version.length); 
        console.log(rest);
        const newVersion = rest + `.${Number(lastDigitChild) + 1}`; 
            console.log({time, newVersion});
        return;

    }
}

const controller = new CreateTimeController();

controller.handle({time: "4-6,6", version: "1.2"});
