import { Signer } from "ethers";
import { convertLibraryNameToLinkId } from "../common";

import {
  AirdropModule,
  AmmModule,
  BasicIssuanceModule,
  ClaimModule,
  CompoundLeverageModule,
  CustomOracleNavIssuanceModule,
  DebtIssuanceModule,
  GeneralIndexModule,
  GovernanceModule,
  IssuanceModule,
  NavIssuanceModule,
  SingleIndexModule,
  StakingModule,
  StreamingFeeModule,
  TradeModule,
  WrapModule
} from "../contracts";
import { Address } from "../types";
import { SET_TOKEN_DATA_UTILS_LIB_PATH } from "../constants";

import { AirdropModule__factory } from "../../typechain/factories/AirdropModule__factory";
import { AmmModule__factory } from "../../typechain/factories/AmmModule__factory";
import { BasicIssuanceModule__factory } from "../../typechain/factories/BasicIssuanceModule__factory";
import { ClaimModule__factory } from "../../typechain/factories/ClaimModule__factory";
import { CompoundLeverageModule__factory } from "../../typechain/factories/CompoundLeverageModule__factory";
import { CustomOracleNavIssuanceModule__factory } from "../../typechain/factories/CustomOracleNavIssuanceModule__factory";
import { DebtIssuanceModule__factory } from "../../typechain/factories/DebtIssuanceModule__factory";
import { GeneralIndexModule__factory } from "../../typechain/factories/GeneralIndexModule__factory";
import { GovernanceModule__factory } from "../../typechain/factories/GovernanceModule__factory";
import { IssuanceModule__factory } from "../../typechain/factories/IssuanceModule__factory";
import { NavIssuanceModule__factory } from "../../typechain/factories/NavIssuanceModule__factory";
import { SingleIndexModule__factory } from "../../typechain/factories/SingleIndexModule__factory";
import { StakingModule__factory } from "../../typechain/factories/StakingModule__factory";
import { StreamingFeeModule__factory } from "../../typechain/factories/StreamingFeeModule__factory";
import { TradeModule__factory } from "../../typechain/factories/TradeModule__factory";
import { WrapModule__factory } from "../../typechain/factories/WrapModule__factory";

export default class DeployModules {
  private _deployerSigner: Signer;

  constructor(deployerSigner: Signer) {
    this._deployerSigner = deployerSigner;
  }

  public async deployBasicIssuanceModule(
    controller: Address,
    setTokenDataUtilsLib: Address
  ): Promise<BasicIssuanceModule> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_DATA_UTILS_LIB_PATH);

    return await new BasicIssuanceModule__factory(
      // @ts-ignore
      {
        [linkId]: setTokenDataUtilsLib,
      },
      this._deployerSigner
    ).deploy(controller);
  }

  public async deployIssuanceModule(
    controller: Address,
    setTokenDataUtilsLib: Address
  ): Promise<IssuanceModule> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_DATA_UTILS_LIB_PATH);

    return await new IssuanceModule__factory(
      // @ts-ignore
      {
        [linkId]: setTokenDataUtilsLib,
      },
      this._deployerSigner
    ).deploy(controller);
  }

  public async deployDebtIssuanceModule(controller: Address): Promise<DebtIssuanceModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new DebtIssuanceModule__factory(this._deployerSigner).deploy(controller);
  }

  public async deployAmmModule(controller: Address): Promise<AmmModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new AmmModule__factory(this._deployerSigner).deploy(controller);
  }

  public async getBasicIssuanceModule(
    basicIssuanceModule: Address,
    setTokenDataUtilsLib: Address
  ): Promise <BasicIssuanceModule> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_DATA_UTILS_LIB_PATH);

    return await new BasicIssuanceModule__factory(
      // @ts-ignore
      {
        [linkId]: setTokenDataUtilsLib,
      },
      this._deployerSigner
    ).attach(basicIssuanceModule);
  }

  public async deployStreamingFeeModule(
    controller: Address,
    setTokenDataUtilsLib: Address
  ): Promise<StreamingFeeModule> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_DATA_UTILS_LIB_PATH);

    return await new StreamingFeeModule__factory(
      // @ts-ignore
      {
        [linkId]: setTokenDataUtilsLib,
      },
      this._deployerSigner,
    ).deploy(controller);
  }

  public async getStreamingFeeModule(
    streamingFeeModule: Address,
    setTokenDataUtilsLib: Address
  ): Promise <StreamingFeeModule> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_DATA_UTILS_LIB_PATH);

    return await new StreamingFeeModule__factory(
      // @ts-ignore
      {
        [linkId]: setTokenDataUtilsLib,
      },
      this._deployerSigner
    ).attach(streamingFeeModule);
  }

  public async deployAirdropModule(controller: Address): Promise<AirdropModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new AirdropModule__factory(this._deployerSigner).deploy(controller);
  }

  public async deployNavIssuanceModule(controller: Address, weth: Address): Promise<NavIssuanceModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new NavIssuanceModule__factory(this._deployerSigner).deploy(controller, weth);
  }

  public async deployTradeModule(
    controller: Address,
    setTokenDataUtilsLib: Address
  ): Promise<TradeModule> {
    const linkId = convertLibraryNameToLinkId(SET_TOKEN_DATA_UTILS_LIB_PATH);

    return await new TradeModule__factory(
      // @ts-ignore
      {
        [linkId]: setTokenDataUtilsLib,
      },
      this._deployerSigner
    ).deploy(controller);
  }

  public async deployWrapModule(controller: Address, weth: Address): Promise<WrapModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new WrapModule__factory(this._deployerSigner).deploy(controller, weth);
  }

  public async deployClaimModule(controller: Address): Promise<ClaimModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new ClaimModule__factory(this._deployerSigner).deploy(controller);
  }

  public async deployStakingModule(controller: Address): Promise<StakingModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new StakingModule__factory(this._deployerSigner).deploy(controller);
  }

  public async deployCustomOracleNavIssuanceModule(controller: Address, weth: Address): Promise<CustomOracleNavIssuanceModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new CustomOracleNavIssuanceModule__factory(this._deployerSigner).deploy(controller, weth);
  }

  public async getNavIssuanceModule(navIssuanceModule: Address): Promise <NavIssuanceModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new NavIssuanceModule__factory(this._deployerSigner).attach(navIssuanceModule);
  }

  public async deploySingleIndexModule(
    controller: Address,
    weth: Address,
    uniswapRouter: Address,
    sushiswapRouter: Address,
    balancerProxy: Address
  ): Promise<SingleIndexModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new SingleIndexModule__factory(this._deployerSigner).deploy(
      controller,
      weth,
      uniswapRouter,
      sushiswapRouter,
      balancerProxy,
    );
  }

  public async deployGeneralIndexModule(
    controller: Address,
    weth: Address
  ): Promise<GeneralIndexModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new GeneralIndexModule__factory(this._deployerSigner).deploy(
      controller,
      weth
    );
  }

  public async deployGovernanceModule(controller: Address): Promise<GovernanceModule> {
    // @ts-ignore  (Now requires SetTokenDataUtils lib but not used)
    return await new GovernanceModule__factory(this._deployerSigner).deploy(controller);
  }

  public async deployCompoundLeverageModule(
    controller: Address,
    compToken: Address,
    comptroller: Address,
    cEth: Address,
    weth: Address,
    libraryName: string,
    libraryAddress: Address
  ): Promise<CompoundLeverageModule> {
    const linkId = convertLibraryNameToLinkId(libraryName);

    return await new CompoundLeverageModule__factory(
      // @ts-ignore
      {
        [linkId]: libraryAddress,
      },
      this._deployerSigner
    ).deploy(
      controller,
      compToken,
      comptroller,
      cEth,
      weth,
    );
  }
}
