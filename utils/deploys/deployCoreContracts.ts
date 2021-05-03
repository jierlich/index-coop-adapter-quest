import { Signer } from "ethers";
import { BigNumberish } from "@ethersproject/bignumber";

import {
  Controller,
  IntegrationRegistry,
  PriceOracle,
  SetToken,
  SetTokenCreator,
  SetValuer,
  SetTokenInternalUtils,
  SetTokenDataUtils
} from "./../contracts";

import { Address } from "./../types";

import { Controller__factory } from "../../typechain/factories/Controller__factory";
import { IntegrationRegistry__factory } from "../../typechain/factories/IntegrationRegistry__factory";
import { PriceOracle__factory } from "../../typechain/factories/PriceOracle__factory";
import { SetToken__factory } from "../../typechain/factories/SetToken__factory";
import { SetTokenCreator__factory } from "../../typechain/factories/SetTokenCreator__factory";
import { SetValuer__factory } from "../../typechain/factories/SetValuer__factory";
import { SetTokenInternalUtils__factory } from "../../typechain/factories/SetTokenInternalUtils__factory";
import { SetTokenDataUtils__factory } from "../../typechain/factories/SetTokenDataUtils__factory";

import { convertLibraryNameToLinkId } from "../common";
import { SET_TOKEN_DATA_UTILS_LIB_PATH, SET_TOKEN_INTERNAL_UTILS_LIB_PATH } from "../constants";

export default class DeployCoreContracts {
  private _deployerSigner: Signer;

  constructor(deployerSigner: Signer) {
    this._deployerSigner = deployerSigner;
  }

  public async deployController(feeRecipient: Address): Promise<Controller> {
    return await new Controller__factory(this._deployerSigner).deploy(feeRecipient);
  }

  public async getController(controllerAddress: Address): Promise<Controller> {
    return await new Controller__factory(this._deployerSigner).attach(controllerAddress);
  }

  public async deploySetTokenInternalUtils(): Promise<SetTokenInternalUtils> {
    return await new SetTokenInternalUtils__factory(this._deployerSigner).deploy();
  }

  public async deploySetTokenDataUtils(): Promise<SetTokenDataUtils> {
    return await new SetTokenDataUtils__factory(this._deployerSigner).deploy();
  }

  public async deploySetTokenCreator(
    controller: Address,
    setTokenInternalUtilsLib: Address
  ): Promise<SetTokenCreator> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_INTERNAL_UTILS_LIB_PATH);
    return await new SetTokenCreator__factory(
      // @ts-ignore
      {
        [linkId]: setTokenInternalUtilsLib,
      },
      this._deployerSigner
    ).deploy(controller);
  }

  public async getSetTokenCreator(
    setTokenCreatorAddress: Address,
    setTokenInternalUtilsLib: Address
  ): Promise<SetTokenCreator> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_INTERNAL_UTILS_LIB_PATH);

    return await new SetTokenCreator__factory(
      // @ts-ignore
      {
        [linkId]: setTokenInternalUtilsLib,
      },
      this._deployerSigner
    ).attach(setTokenCreatorAddress);
  }

  public async deploySetToken(
    _components: Address[],
    _units: BigNumberish[],
    _modules: Address[],
    _controller: Address,
    _manager: Address,
    _name: string,
    _symbol: string,
    _setTokenInternalUtilsLib: Address,
  ): Promise<SetToken> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_INTERNAL_UTILS_LIB_PATH);

    return await new SetToken__factory(
      // @ts-ignore
      {
        [linkId]: _setTokenInternalUtilsLib,
      },
      this._deployerSigner
    ).deploy(
      _components,
      _units,
      _modules,
      _controller,
      _manager,
      _name,
      _symbol,
    );
  }

  public async getSetToken(
    setTokenAddress: Address,
    libraryName: string,
    libraryAddress: Address
  ): Promise<SetToken> {
    const linkId = convertLibraryNameToLinkId(libraryName);

    return await new SetToken__factory(
      // @ts-ignore
      {
        [linkId]: libraryAddress,
      },
      this._deployerSigner
    ).attach(setTokenAddress);
  }

  public async deployPriceOracle(
    controller: Address,
    masterQuoteAsset: Address,
    adapters: Address[],
    assetOnes: Address[],
    assetTwos: Address[],
    oracles: Address[],
  ): Promise<PriceOracle> {
    return await new PriceOracle__factory(this._deployerSigner).deploy(
      controller,
      masterQuoteAsset,
      adapters,
      assetOnes,
      assetTwos,
      oracles,
    );
  }

  public async getPriceOracle(priceOracleAddress: Address): Promise<PriceOracle> {
    return await new PriceOracle__factory(this._deployerSigner).attach(priceOracleAddress);
  }

  public async deployIntegrationRegistry(controller: Address): Promise<IntegrationRegistry> {
    return await new IntegrationRegistry__factory(this._deployerSigner).deploy(controller);
  }

  public async getIntegrationRegistry(integrationRegistryAddress: Address): Promise<IntegrationRegistry> {
    return await new IntegrationRegistry__factory(this._deployerSigner).attach(integrationRegistryAddress);
  }

  public async deploySetValuer(
    controller: Address,
    setTokenDataUtilsLib: Address
    ): Promise<SetValuer> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_DATA_UTILS_LIB_PATH);

    return await new SetValuer__factory(
      // @ts-ignore
      {
        [linkId]: setTokenDataUtilsLib,
      },
      this._deployerSigner
    ).deploy(controller);
  }
}
