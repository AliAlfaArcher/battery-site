type BatteryDevice = {
    id: string;
    name: string;
    image: string;
    release_date: string;
    dimensions: {
        unit: string;
        width: number;
        depth: number;
    };
    energy: number;
    cost: number;
}

type TransformerDevice = {
    id: string;
    name: string;
    dimensions: {
        width: number;
        depth: number;
    };
    energy: number;
    cost: number;
    conf_needs: number;
}

type ConfigurationEstimate = {
    energy: number;
    cost: number;
    landSize: {
        width: number;
        depth: number;
    };
    landLayout: number[][];
    deviceList: {
        name: string;
        qty: number;
    }[];
}

type devicesData = {
    batteries: BatteryDevice[];
    transformer: TransformerDevice;
}
