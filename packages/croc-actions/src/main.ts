/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Action as ReduxAction } from 'redux';

interface Action<T extends string, P, M> extends ReduxAction<T> {
  payload: P;
  meta?: M;
  syncData?: any;
}

type FunctionType = (...args: any[]) => any;

interface ActionCreatorsMapObject {
  [actionCreator: string]: FunctionType;
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

export function createAction<T extends string, P, M>(
  type: T,
  payload: P,
  meta?: M,
): Action<T, P, M> {
  return {
    type,
    payload,
    meta,
  };
}

export const SET_SETTINGS = 'SET_SETTINGS';
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const CHANGE_PLAYER_SCORE = 'CHANGE_PLAYER_SCORE';
export const ADD_ANSWERS = 'ADD_ANSWERS';
export const PROPOSE_ANSWER = 'PROPOSE_ANSWER';
export const ADD_CHAT_MESSAGES = 'ADD_CHAT_MESSAGES';
export const SET_PAINTER = 'SET_PAINTER';
export const SET_NEXT_WORD_PICKER = 'SET_NEXT_WORD_PICKER';
export const PICK_WORD = 'PICK_WORD';
export const START_ROUND = 'START_ROUND';
export const WAIT = 'WAIT';
export const END_ROUND = 'END_ROUND';
export const ADD_DRAW_ACTIONS = 'ADD_DRAW_ACTIONS';
export const UNDO_DRAW_ACTIONS = 'UNDO_DRAW_ACTIONS';

type NextPainterPickType = 'winner' | 'rotation' | 'random';
type NextWorkPickType =
  | 'random'
  | 'newPainterFromVariants'
  | 'oldPainterFromVariants'
  | 'newPainterAnything';

type CrocGameSettings = {
  nextPainterPickType: NextPainterPickType;
  nextWordPickType: NextWorkPickType;

  // wordBase identifier or own base
  wordBase: string | { baseId: string };

  // for word pick type
  numberOfWordVariants: number;
};

export const Actions = {
  addPlayers: (
    players: Array<{
      id: string;
      name?: string;
      score?: number;
      disconnected?: boolean;
    }>,
  ) => {
    return createAction(ADD_PLAYERS, players, { sync: true });
  },
  deletePlayer: (playerId: string) => {
    return createAction(DELETE_PLAYER, playerId);
  },
  changePlayerScore: (player: { id: string; newScore: number }) => {
    return createAction(CHANGE_PLAYER_SCORE, player, { sync: true });
  },
  addAnswers: (
    answers: Array<{ answer: string; right?: boolean; from?: string }>,
  ) => {
    return createAction(ADD_ANSWERS, answers, { sync: true });
  },
  proposeAnswer: (answer: string) => {
    return createAction(PROPOSE_ANSWER, answer, { sync: true });
  },
  addChatMessages: (messages: Array<{ text: string; from?: string }>) => {
    return createAction(ADD_CHAT_MESSAGES, messages, { sync: true });
  },
  setPainter: (id: string) => {
    return createAction(SET_PAINTER, id);
  },
  setNextWordPicker: (id?: string) => {
    return createAction(SET_NEXT_WORD_PICKER, id);
  },
  pickWord: (word?: string) => {
    return createAction(PICK_WORD, word, { sync: true });
  },
  startRound: (params: { word?: string; remainingTime: number }) => {
    return createAction(START_ROUND, {
      word: params.word,
      remainingTime: params.remainingTime,
    });
  },
  endRound: () => {
    return createAction(END_ROUND, undefined);
  },
  wait: (params: { type: 'settings' } | undefined = undefined) => {
    return createAction(WAIT, params);
  },
  addDrawActions: (drawActions: any[]) => {
    return createAction(ADD_DRAW_ACTIONS, drawActions, { sync: true });
  },
  setSettings: (settings: CrocGameSettings) => {
    return createAction(SET_SETTINGS, settings);
  },
};

export type Actions = ActionsUnion<typeof Actions>;
