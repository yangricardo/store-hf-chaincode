import { Iterators } from "fabric-shim";

export type KeyModification = Omit<Iterators.KeyModification, "value">;
